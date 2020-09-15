const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);
const passport = require('passport');
const User = require('../models/user');
const Cart = require('../models/cart');
const path = require('path');
const upload = require('../upload');

const Product = require('../models/product');
const UserController = require('../controllers/userController');

router.route("/profile")
  .get(isLoggedIn,UserController.getProfile)

router.route("/profile-shop")
  .get(isLoggedIn,UserController.getProfileShop)
  .post()

router.route("/shopall-ledger")
  .get(isLoggedIn,UserController.getLedger)

router.route("/shop-orders")
  .get(isLoggedIn,UserController.getShopOrders)
  .post()

router.route("/profile-orders")
  .get(isLoggedIn,UserController.getProfileOrders)
  .post()

router.route("/profile-wishlist")
  .get(isLoggedIn,UserController.getProfileWishlist)
  .post()


router.get('/logout',isLoggedIn, (req, res, next) => {
  req.session.cart = null;
  req.logout();
  res.redirect('/')
});

router.use('/', notLoggedIn, function(req, res, next) {
   next();
})

router.get('/signup', (req, res, next) => {
  var messages = req.flash('error')
  res.render('register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0})
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect:'/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  var messages = req.flash('error')
  res.render('login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0})
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect:'/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/signin')
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/profile')
}
