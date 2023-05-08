var express = require('express');
var router = express.Router();
var postModel = require('../models/post');
const multer = require('multer');
var fs = require('fs');

var upload = multer({ dest: 'public/images/posts' });


/* GET post page. */
router.get('/', function (req, res, next) {
    postModel.find({})
        .then(data => {
            res.render('layouts-admin', { title: 'Bài viết', link: 'news', body: 'news', data: data })
        })
});

router.get('/:id', function (req, res, next) {
    postModel.findById(req.params.id)
        .then(data => {
            console.log(data)
            res.render('layouts', { title: `Bài viết - ${data.title}`, link: 'news', body: 'post-detail', data: data });
        }).catch(err => {
            res.render('err');
        })

})

router.get('/add', function (req, res, next) {
    res.render('layouts-admin', { title: 'Thêm bài viết', link: 'add-post', body: 'add-post' })
});


router.post('/add', upload.single('image'), function (req, res, next) {
    var today = new Date();
    var dd = today.getDate();
    if (dd < 10)
        dd = '0' + dd;
    var mm = today.getMonth() + 1;
    if (mm < 10)
        mm = '0' + mm;
    var yyyy = today.getFullYear();
    var data = req.body
    var file = req.file


    postModel.create({
        title: data.title,
        author: data.author,
        categogy: data.categogy,
        summary: data.summary,
        detail: data.detail,
        image: file.destination.replace('public', '') + '\\' + file.originalname,
        date: dd + '/' + mm + '/' + yyyy
    })
        .then(() => {
            console.log('Thêm thành công')

        }
        ).catch((err) => {
            console.log('Thêm thất bại', err)
        })

    //Xử lý ảnh
    fs.rename(file.path, file.path.replace(file.filename, file.originalname), (err) => {
        if (err)
            res.redirect('/admin/post/add');
    });


    res.redirect('/admin/post/add');

})

module.exports = router;
