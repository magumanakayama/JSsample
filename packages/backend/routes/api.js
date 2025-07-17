const express = require('express');
const usersHandler = require('../handlers/user');
const router = express.Router();

router.get('/foo', (req, res) => {
    res.status(200).send('foo: foo');
});

router.get('/bar', (req, res) => {
    res.status(200).send('bar: bar');
});

///////////////////// 汎用ミドルウェア /////////////////////
const logMiddleware = (req, res, next) => {
    console.log(`${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}, ${req.method} ${req.url}`);
    next();
};

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
//////////////////////////////////////////////////////////

router.get('/user/:id', logMiddleware, wrapAPI(usersHandler.getUser));
router.get('/users', logMiddleware, wrapAPI(usersHandler.getUsers));

exports.router = router;