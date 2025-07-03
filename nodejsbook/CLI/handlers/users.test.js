// 関数をモック化
const mockRedisGet = jest.fn();
const mockRedisScanStream = jest.fn();
// 第一引数；モック化するモジュールのパス（requireで読み込むモジュール丸ごとモック化）
// 第二引数；モック化するモジュールの実装
jest.mock('../lib/redis', () => {
    return {
        getClient: jest.fn().mockImplementation(() => ({
            get: mockRedisGet,
            scanStream: mockRedisScanStream,
        }))
    };
})

const { getUser, getUsers } = require('./user');

beforeEach(() => {
    mockRedisGet.mockReset();
    mockRedisScanStream.mockReset();
});

test('getUser 成功', async () => {
    // モックの戻り値を設定
    mockRedisGet.mockResolvedValueOnce(JSON.stringify({ id: 1, name: 'maguma' }));
    const req = { params: { id: 1 } };
    const user = await getUser(req);

    // ユーザーオブジェクトのプロパティでのテスト
    expect(user.id).toStrictEqual(1);
    expect(user.name).toStrictEqual('maguma');

    // // オブジェクト単位でのテスト
    // expect(user).toStrictEqual({ id: 1, name: 'maguma' });

    // モックの呼び出し回数と引数の確認
    expect(mockRedisGet).toHaveBeenCalledTimes(1);
    expect(mockRedisGet).toHaveBeenCalledWith('user1');
});

test('getUser 失敗', async () => {
    // 期待するアサーションの数を指定、必ずアサーションを通るようにする
    expect.assertions(2);

    // モックの戻り値を設定
    mockRedisGet.mockRejectedValueOnce(new Error('User not found'));

    const req = { params: { id: 999 } };

    try {
        const user = await getUser(req);
    } catch (err) {
        // エラーメッセージの確認
        expect(err.message).toStrictEqual('User not found');
        expect(err instanceof Error).toStrictEqual(true);
    }
});

test('getUsersのテスト', async () => {
    // ストリーム処理のモックを設定
    const streamMock = {
        // Symbol.asyncIterator
        // 非同期イテレータを実装するための特別なシンボル
        async* [Symbol.asyncIterator]() {
            yield ['user1', 'user2'];
            yield ['user3'];
        }
    };
    mockRedisScanStream.mockReturnValueOnce(streamMock);
    mockRedisGet.mockImplementation((key) => {
        switch (key) {
            case 'user1':
                return Promise.resolve(JSON.stringify({ id: 1, name: 'maguma' }));
            case 'user2':
                return Promise.resolve(JSON.stringify({ id: 2, name: 'Nakayama' }));
            case 'user3':
                return Promise.resolve(JSON.stringify({ id: 3, name: 'Okabe' }));
        }
        return Promise.resolve(null);
    });

    const reqMock = { };
    const result = await getUsers(reqMock);
    expect(result.users).toStrictEqual([
        { id: 1, name: 'maguma' },
        { id: 2, name: 'Nakayama' },
        { id: 3, name: 'Okabe' }
    ]);
    expect(mockRedisGet).toHaveBeenCalledTimes(3);
    expect(mockRedisScanStream).toHaveBeenCalledTimes(1);
});