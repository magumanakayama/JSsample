const express = require('express');
const app = express();

// 汎用ミドルウェア
const logMiddleware = (req, res, next) => {
    console.log(`${Date.now()}, ${req.method} ${req.url}`);
    next();
};

app.get('/', logMiddleware, (req, res) => {
    res.status(200).send('Hello, World!');
});

app.get('/user/:id', logMiddleware, (req, res) => {
    res.status(200).send(req.params.id);
});

app.listen(3000, () => {
    console.log('さーばー起動中');
});