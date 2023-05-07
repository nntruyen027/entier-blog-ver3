var express = require('express');
const path = require('path');
var router = express.Router();
var contactModel = require('../models/contact');
var postModel = require('../models/post');
const passport = require('../configs/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'index.html'));
  res.sendFile(file_path)
});


/* POST contact form */
router.post('/', (req, res, next) => {
  contactModel.create({
    name: req.body['contact-name'],
    email: req.body['contact-mail'],
    phone: req.body['contact-phone'],
    address: req.body['contact-address'],
    job: req.body['contact-who'],
    other: req.body['contact-other']
  })
    .then(data => {
      res.status(200).json({ message: 'Gửi dữ liệu thành công' });
    })
    .catch(err => {
      res.status(500).send({ message: 'Gửi thất bại' })
    })

})

/* GET introduce page */

router.get('/introduce', (req, res, next) => {
  var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'introduce.html'));
  res.sendFile(file_path)
})


router.get('/post', (req, res, next) => {
  var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'news.html'));
  res.sendFile(file_path)
})

router.get('/post/data', (req, res, next) => {
  postModel.find({})
    .then(data => {
      console.log(data)
      res.json({ data: data });
    })
    .catch(err => {
      console.log(err)
      res.json({ data: err });
    })
})

/* GET login page */

router.get('/login', (req, res, next) => {
  var file_path = path.join(path.join(__dirname.replace('routes', 'views'), 'login.html'));
  res.sendFile(file_path);
})

/* POST login page */

router.post('/login', passport.authenticate('local-login', {
  failureRedirect: '/login',
}), (req, res, next) => {
  res.redirect('/admin');
});

module.exports = router;
