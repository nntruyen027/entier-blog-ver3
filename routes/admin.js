var express = require('express');
const path = require('path');
var router = express.Router();
var postRouter = require('./post-admin');

/* GET admin page. */
router.get('/', function (req, res, next) {
    res.render('layouts-admin', { title: 'Trang chủ', link: 'home', body: 'home', data: '' })
});


router.get('/introduce', function (req, res, next) {
    res.render('layouts-admin', { title: 'Giới thiệu', link: 'introduce', body: 'introduce', data: '' })
});

router.use('/post', postRouter);



module.exports = router;
