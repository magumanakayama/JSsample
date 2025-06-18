const fs = require('fs'); // 標準モジュール
const path = require('path'); // 標準モジュール
const { marked } = require('marked'); // サードパーティモジュール

exports.mdToHtml = (dirname, argv) => {
    const mdStr = fs.readFileSync(path.resolve(dirname, argv.html), 'utf-8');
    return marked(mdStr);
}

exports.generateHtmlFile = (dirname, argv, markedMd) => {
    fs.writeFileSync(path.resolve(dirname, argv.html.replace(/\.md$/, '.html')), markedMd, 'utf-8');
}