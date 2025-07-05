const redis = require('../lib/redis');
const {BadRequest} = require('../lib/error');

// '/user:id'の時に呼び出す関数
const getUser = async (request) => {
    const key = `user${request.params.id}`;
    const val = await redis.getClient().get(key); // valはJSON文字列
    const user = JSON.parse(val); // userはJSオブジェクト
    isFalsy(user); // ユーザーが存在しない場合はエラーを投げる
    return user;
}
exports.getUser = getUser;


// '/users'の時に呼び出す関数
const getUsers = async (request) => {
    // offset版
    // const offset = req.query?.offset ? Number(req.query.offset) : 0;
    // const userList = await redis.lrange('users:list', offset, offset + 1);

    // const users = userList.map((user) => {
    //     return JSON.parse(user)
    // });
    // res.status(200).send({users});

    // stream版
    const stream = redis.getClient().scanStream({
        match: 'user:*', // パターンにマッチするキーを取得
        count: 2 // 一度に取得する数
    });

    const users = [];
    for await (const resultKeys of stream) {
        for (const key of resultKeys) {
            const value = await redis.getClient().get(key);
            users.push(JSON.parse(value))
        }
    }
    isFalsy(users); // ユーザーが存在しない場合はエラーを投げる
    // IDを昇順にソート
    users.sort((a, b) => a.id - b.id);
    return { users: users };
}
exports.getUsers = getUsers;

const isFalsy = (val) => {
    if (!val) {
        throw new BadRequest('ユーザーが見つかりません', { cause: `値が${val}です` });
    }
}