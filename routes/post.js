var express = require('express');
const path = require('path');
var router = express.Router();
var postModel = require('../models/post');


/* GET post page. */
router.get('/', function (req, res, next) {
    var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'admin/news.html'));
    res.sendFile(file_path)
});

router.get('/data', function (req, res, next) {
    postModel.find().then(data => {
        res.data = data;
    })
        .catch(err => {
            console.log('Lỗi server', err);
        })
})

router.get('/add', function (req, res, next) {
    var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'admin/add-post.html'));
    res.sendFile(file_path)
});


router.post('/add', function (req, res, next) {
    postModel.create({
        title: req.body.title,
        categogy: req.body.categogy,
        summary: req.body.summary,
        detail: req.body.detail,
        image: req.body.image,
        date: new Date()
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
