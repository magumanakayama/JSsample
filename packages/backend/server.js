const path = require('path');
const express = require('express');
const app = express();
const api = require('./routes/api');
const redis = require('./lib/redis');

const usersHandler = require('./handlers/user');
const { get } = require('http');

// エラーハンドリングのためのミドルウェア
const { BadRequest, NotFoundHTML } = require('./lib/error');
const { wrap } = require('yargs');

// 静的ファイル配信
app.use('/static', express.static(path.join(__dirname, 'public')));


// EJSをテンプレートエンジンとして設定
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'view', 'index.ejs'));
});

// APIのラッパー関数
const wrapAPI = (fn, responder = (res, data) => res.status(200).json(data)) => {
    return (req, res, next) => {
        try {
            fn(req)
                .then((data) => responder(res, data))
                .catch((e) => {
                    next(e); //fnでエラーが発生した場合、nextにエラーを渡す
                });
        } catch (e) {
            next(e); //tryブロック内でエラーが発生した場合、nextにエラーを渡す
        }
    };
};

////////////// Express //////////////
// 汎用ミドルウェア
const logMiddleware = (req, res, next) => {
    console.log(`${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}, ${req.method} ${req.url}`);
    next();
};

app.get('/user/:id', logMiddleware, wrapAPI(usersHandler.getUser));


app.get('/api/users', logMiddleware, wrapAPI(usersHandler.getUsers));

// エラールート
app.get('/err', logMiddleware, (req, res) => {
    throw new Error('意図的なエラー');
});

// 包括的エラーハンドリング(Express全体のエラーハンドリングができる、非同期関数のエラーはこれだけでは捕捉できない)
app.use((err, req, res, next) => {
    console.error('エラー:', err);
    switch (true) {
        case (err instanceof BadRequest):
            res.status(err.status || 400).send(err.message);
            break;
        case (err instanceof NotFoundHTML):
            res.status(err.status || 404).send(err.message);
            break;
        default:
            res.status(500).send('Internal Server Error');
            break;
    }
});
//////////////////////////////////////////////


////////////// Redis //////////////
redis.connect()
    .once('ready', async () => {
        await redis.init();
        try {
            app.listen(8000, () => {
            console.log('さーばー起動中');
        });
        } catch (err) {
            console.error('Redisの接続に失敗しました:', err);
            process.exit(1); // サーバーを終了
        }
    })
    .on('error', (err) => {
        console.error('Redisのエラー:', err);
        process.exit(1); // サーバーを終了
    });
//////////////////////////////////////////


////////////// Router //////////////
app.use('/api', api.router);
//////////////////////////////////////////