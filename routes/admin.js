var express = require('express');
const path = require('path');
var router = express.Router();
var postRouter = require('./post');

/* GET admin page. */
router.get('/', function (req, res, next) {
    res.render('layouts-admin', { title: 'Trang chủ', link: 'home', body: 'home' })
});


router.get('/introduce', function (req, res, next) {
    res.render('layouts-admin', { title: 'Giới thiệu', link: 'introduce', body: 'introduce' })
});

router.use('/post', postRouter);



module.exports = router;
