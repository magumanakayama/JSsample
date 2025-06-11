import fs from 'fs'; // 標準モジュール
import path from 'path'; // 標準モジュール
import yargs from 'yargs'; // サードパーティモジュール
import { hideBin } from 'yargs/helpers'; // サードパーティモジュールのインタフェース
import { fileURLToPath } from 'url'; // 標準モジュール

// ESモジュールでの__dirnameと__filenameの取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("-----start-----");

const argv = yargs(hideBin(process.argv))
    .option('name', {
        describe: 'アプリ名を表示'
    })
    .option('file', {
        describe: '指定したファイル名を表示'
    })
    .help()
    .argv;

if (argv.name) {
    console.log("appName:", packageJson.name);
    process.exit(0);
}

const fileStr = fs.readFileSync(path.resolve(__dirname, argv.file), 'utf-8');
console.log(JSON.parse(fileStr));



console.log("-----end-----");