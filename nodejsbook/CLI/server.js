const Redis = require('ioredis');
const path = require('path');
const express = require('express');
const app = express();


// EJSをテンプレートエンジンとして設定
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'view', 'index.ejs'));
});


// Redisクライアントの設定
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password : process.env.REDIS_PASSWORD, // Redisのパスワード
    enableOfflineQueue: false, // オフラインキューを無効化    
})

const redisInit = async () => {
    // await Promise.all([
    //     redis.set('user1', JSON.stringify({ id: 1, name : 'maguma' })),
    //     redis.set('user2', JSON.stringify({ id: 2, name : 'Nakayama' })),
    //     redis.set('user3', JSON.stringify({ id: 3, name : 'Okabe' })),
    // ])

    await redis.rpush('users:list', JSON.stringify({ id: 1, name : 'maguma' }));
    await redis.rpush('users:list', JSON.stringify({ id: 2, name : 'Nakayama' }));
    await redis.rpush('users:list', JSON.stringify({ id: 3, name : 'Okabe' }));
};
         

////////////// Express //////////////
// 汎用ミドルウェア
const logMiddleware = (req, res, next) => {
    console.log(`${Date.now()}, ${req.method} ${req.url}`);
    next();
};

// app.get('/', logMiddleware, (req, res) => {
//     res.status(200).send('Hello, World!');
// });

app.get('/user/:id', logMiddleware, async (req, res) => {
    try {
        const key = `user${req.params.id}`;
        const val = await redis.get(key);
        const user = JSON.parse(val);
        res.status(200).send(user);
    } catch (err) {
        console.error('ユーザーデータの取得に失敗しました:', err);
        res.status(500).send('ユーザーデータの取得に失敗しました');
    }
});

app.get('/users', logMiddleware, async (req, res) => {
    try {
        const offset = req.query?.offset ? Number(req.query.offset) : 0;
        const userList = await redis.lrange('users:list', offset, offset + 1);
    
        const users = userList.map((user) => {
            return JSON.parse(user)
        });
        res.status(200).send({users});
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
redis.once ('ready', async () => {

    await redisInit();

    try {
        app.listen(3000, () => {
        console.log('さーばー起動中');
    });
    } catch (err) {
        console.error('Redisの接続に失敗しました:', err);
        process.exit(1); // サーバーを終了
    }
});

redis.on('error', (err) => {
    console.error('Redisのエラー:', err);
    process.exit(1); // サーバーを終了
});
//////////////////////////////////////////