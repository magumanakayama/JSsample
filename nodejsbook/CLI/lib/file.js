const fs = require('fs'); // 標準モジュール
const path = require('path'); // 標準モジュール

exports.readFileContent = (dirname, argv) => {
    const fileStr = fs.readFileSync(path.resolve(dirname, argv.file), 'utf-8');
    return fileStr;
}