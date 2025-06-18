const yargs = require('yargs'); // サードパーティモジュール
const { hideBin } = require('yargs/helpers'); // サードパーティモジュールのインタフェース
// ユーザー定義関数
const { readAppName } = require('./lib/name.js');
const { readFileContent } = require('./lib/file.js');
const { mdToHtml, generateHtmlFile } = require('./lib/html.js');

// // ESモジュールでの__dirnameと__filenameの取得
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

console.log("-----start-----");

const argv = yargs(hideBin(process.argv))
    .option('name', {
        describe: 'アプリ名を表示'
    })
    .option('file', {
        describe: '指定したファイル名を表示'
    })
    .option('html', {
        describe: 'MarkdownファイルをHTMLに変換'
    })
    .help()
    .argv;

if (argv.name) {
    console.log(readAppName(__dirname));
    process.exit(0);
}

if (argv.html) {
    const markedStr = mdToHtml(__dirname, argv);
    generateHtmlFile(__dirname, argv, markedStr);
    process.exit(0);
}

console.log(readFileContent(__dirname, argv));


console.log("-----end-----");