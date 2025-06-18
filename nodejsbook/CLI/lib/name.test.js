const path = require('path'); // 標準モジュール

// テスト対象関数
const { readAppName } = require('./name.js');

// 暫定対策：1つ上のディレクトリを取得
const parentDir = path.dirname(__dirname);

test('readAppNameのテスト', () => {
    expect(readAppName(parentDir)).toStrictEqual('yoneda-app');
});