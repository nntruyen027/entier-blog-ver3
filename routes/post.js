var express = require('express');
const path = require('path');
var router = express.Router();
var postModel = require('../models/post');
var categogyModel = require('../models/categogy');


/* GET post page. */
router.get('/', function (req, res, next) {
    postModel.find({})
        .then(data => {
            res.render('layouts-admin', { title: 'Bài viết', link: 'news', body: 'news', data: data })
        })
});

router.get('/add', function (req, res, next) {
    res.render('layouts-admin', { title: 'Thêm bài viết', link: 'add-post', body: 'add-post' })
});


router.post('/add', function (req, res, next) {
    var today = new Date();
    var dd = today.getDate();
    if (dd < 10)
        dd = '0' + dd;
    var mm = today.getMonth() + 1;
    if (mm < 10)
        mm = '0' + mm;
    var yyyy = today.getFullYear();
    var data = req.body
    console.log(data);
    postModel.create({
        title: data.title,
        author: data.author,
        categogy: data.categogy,
        summary: data.summary,
        detail: data.detail,
        image: data.image,
        date: dd + '/' + mm + '/' + yyyy
    })
        .then(() => {
            console.log('Thêm thành công')

        }
        ).catch((err) => {
            console.log('Thêm thất bại', err)
        })

    res.redirect('/admin/post/add');

})

module.exports = router;
