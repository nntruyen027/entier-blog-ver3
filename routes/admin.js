var express = require('express');
const path = require('path');
var router = express.Router();
var postRouter = require('./post');

/* GET admin page. */
router.get('/', function (req, res, next) {
    var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'admin/index.html'));
    res.sendFile(file_path)
});


router.get('/introduce', function (req, res, next) {
    var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'admin/introduce.html'));
    res.sendFile(file_path)
});

router.use('/post', postRouter);



module.exports = router;
