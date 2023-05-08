var express = require('express');
const path = require('path');
var router = express.Router();
var contactModel = require('../models/contact');
var postModel = require('../models/post');
const passport = require('../configs/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layouts', { title: 'Trang chủ', link: 'home', body: 'home', data: '' })
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
  res.render('layouts', { title: 'Giới thiệu', link: 'introduce', body: 'introduce', data: '' })
})


router.get('/post', (req, res, next) => {
  postModel.find({})
    .then(data => {
      res.render('layouts', { title: 'Bài viết', link: 'news', body: 'news', data: data })
    })
})

router.get('/post/:id', (req, res, next) => {
  postModel.findById(req.params.id)
    .then(data => {
      console.log(data)
      res.render('layouts', { title: `Bài viết - ${data.title}`, link: 'news', body: 'post-detail', data: data });
    }).catch(err => {
      res.render('err');
    })
})

/* GET login page */

router.get('/login', (req, res, next) => {
  res.render('login')
})

/* POST login page */

router.post('/login', passport.authenticate('local-login', {
  failureRedirect: '/login',
}), (req, res, next) => {
  res.redirect('/admin');
});

module.exports = router;
