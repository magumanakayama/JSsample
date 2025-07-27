const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const express = require('express');
const app = express();

// APIリクエストのプロキシ設定
app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://node_backend:8000',
    })
);

// app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')));

// dist配下を静的ファイルとして公開
app.use(express.static(path.join(__dirname, 'dist')));

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 包括的エラーハンドリング(Express全体のエラーハンドリングができる、非同期関数のエラーはこれだけでは捕捉できない)
app.use((err, req, res, next) => {
    console.error('エラー:', err);
    res.status(500).send('Internal Server Error');
});


////////////// サーバー起動 //////////////
app.listen(3000, () => {
    console.log('ふろんとえんど起動中');
});
//////////////////////////////////////////