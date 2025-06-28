const express = require('express');
const router = express.Router();

router.get('/foo', (req, res) => {
    res.status(200).send('foo: foo');
});

router.get('/bar', (req, res) => {
    res.status(200).send('bar: bar');
});

exports.router = router;