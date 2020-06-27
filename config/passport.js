const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const PasswordReset = require('../models/password');
//const { check, validationResult } = require('express-validator');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, email,password, done){
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min: 6});
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg)
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, {message: "Email Adress is already in use."});
    }


    const date = Date.now();
    const created_at = new Date(date).toDateString();

    const pwdRecovery = new PasswordReset({
      password: req.body.password,
      fullname: req.body.fullname,
      email: req.body.email
    });

    pwdRecovery.save().then(() => console.log('Done Sir'));

    var newUser = new User();
      newUser.fullname = req.body.fullname;
      newUser.country = req.body.country;
      newUser.address = req.body.address;
      newUser.cell = req.body.cell;
      newUser.date = created_at;
      newUser.city = req.body.city;
      newUser.zipcode = req.body.zipcode;
      /*Shop Details*/
      newUser.shopname = req.body.shopname;
      newUser.is_shop = 0;
      newUser.facebook = req.body.facebook;
      newUser.instagram = req.body.instagram;
      newUser.twitter = req.body.twitter;
      newUser.linkedin = req.body.linkedin;
      newUser.website = req.body.website;
      newUser.profile_image;
      newUser.shop_items;
      newUser.wishlist;
      newUser.orders;
      newUser.active = 0;
      /*End Shop Details*/
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save((err, result) => {
        if (err) {
          return done(err);
        }
        return done(null, newUser);
      })
  })
}));

//Sign In

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg)
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: "User Not Found"});
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: "Wrong Password"});
    }
    return done(null, user);
  })
}));
