const fs = require('fs'); // 標準モジュール
const path = require('path'); // 標準モジュール

exports.readAppName = (dirname) => {
    const packageStr = fs.readFileSync(path.resolve(dirname, 'package.json'), 'utf-8');
    return JSON.parse(packageStr).name;
}