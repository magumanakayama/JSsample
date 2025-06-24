const fs = require('fs'); // 標準モジュール
const path = require('path'); // 標準モジュール

// テスト対象関数
const {readFileContent} = require('./file.js');

// 暫定対策：1つ上のディレクトリを取得
const parentDir = path.dirname(__dirname);

const argv = { file: 'hoge.txt' }; // テスト用の引数

test('readFileContentのテスト', () => {
    expect(readFileContent(parentDir, argv)).toStrictEqual('hoge\r\nhogehoge\r\nhogege');
});
// });