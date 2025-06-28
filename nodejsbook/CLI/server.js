const path = require('path');
const express = require('express');
const app = express();
const api = require('./routes/api');
const redis = require('./lib/redis');

const usersHandler = require('./handlers/user');

// 静的ファイル配信
app.use('/static', express.static(path.join(__dirname, 'public')));


// EJSをテンプレートエンジンとして設定
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'view', 'index.ejs'));
});


////////////// Express //////////////
// 汎用ミドルウェア
const logMiddleware = (req, res, next) => {
    console.log(`${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}, ${req.method} ${req.url}`);
    next();
};

// app.get('/', logMiddleware, (req, res) => {
//     res.status(200).send('Hello, World!');
// });

app.get('/user/:id', logMiddleware, async (req, res) => {
    try {
        const user = await usersHandler.getUser(req);
        res.status(200).json(user);
    } catch (err) {
        console.error('ユーザーデータの取得に失敗しました:', err);
        res.status(500).send('ユーザーデータの取得に失敗しました');
    }
});


app.get('/users', logMiddleware, async (req, res) => {
    try {
        const usersObj = await usersHandler.getUsers(req);
        res.render(path.join(__dirname, 'view', 'users.ejs'), usersObj);
    } catch (err) {
        console.error('ユーザーデータの取得に失敗しました:', err);
        res.status(500).send('ユーザーデータの取得に失敗しました');
    }
});

// エラールート
app.get('/err', logMiddleware, (req, res) => {
    throw new Error('意図的なエラー');
});

// 包括的エラーハンドリング(Express全体のエラーハンドリングができる)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('さーばーえらー');
});
//////////////////////////////////////////////


////////////// Redis //////////////
redis.connect()
    .once('ready', async () => {
        await redis.init();
        try {
            app.listen(3000, () => {
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