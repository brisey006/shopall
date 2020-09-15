const express = require('express');
const User = require('../models/user');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const csrf = require('csurf');
const passport = require('passport');
const fs = require('fs');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

module.exports = {
  /*Profile Dashboard*/
  getProfile: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      res.render('profile', {profile: user});
    } catch (err) {
      next(err)
    }
  },

  editProfile: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);
      const {fullname, shopname,shopType,website, facebook, twitter, instagram, linkedin, country, address, city, zipcode, cell, ecocash, onemoney} = req.body;

      user.fullname = fullname;
      user.shopname = shopname;
      user.shopType = shopType;
      user.website = website;
      user.facebook = facebook;
      user.twitter = twitter;
      user.instagram = instagram;
      user.linkedin = linkedin;
      user.country = country;
      user.address = address;
      user.city = city;
      user.zipcode = zipcode;
      user.cell = cell;
      user.ecocash = ecocash;
      user.onemoney = onemoney;

      await user.save();
      res.redirect('/user/profile')
    } catch (err) {
      next(err)
    }
  },

  getEditProfileImage: async (req, res, next) => {
     try {
       const userId = req.session.passport.user;
       const user = await User.findById(userId)
       res.render('edit-profile-image', {profile: user});
     } catch (err) {
       next(err)
     }
   },

   editProfileImage: async (req, res, next) => {
     try {
       const userId = req.session.passport.user;
       const user = await User.findById(userId);

       if (user.profile_image) {
         const imgpath = "./public/uploads/" + user.profile_image;
         fs.unlinkSync(imgpath);
       }

       user.profile_image = req.file.filename;

       await user.save();
       res.redirect('/user/profile')
     } catch (err) {
       next(err)
     }
   },

  /*End Dashboard*/
  /*Profile Shop*/

  getProfileShop: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const productsIds = user.shop_items;
      const products = [];
      for (var i = 0; i < productsIds.length; i++) {
        const product = await Product.findById(productsIds[i]);
        products.push(product);
      }

      res.render('profile-shop', {
        profile: user,
        products: products.reverse()
      });
    } catch (err) {
      next(err)
    }
  },


/*End Shop*/
/*Profile Orders*/
  getShopOrders: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const productsIds = user.shop_orders;
      const products = [];
      for (var i = 0; i < productsIds.length; i++) {
        const product = await Order.findById(productsIds[i]);
        products.push(product);
      }

      res.render('orders-shop', {
        profile: user,
        orders: products.reverse()
      });
    } catch (err) {
      next(err)
    }
  },

  getProfileOrders: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const productsIds = user.orders;
      const products = [];
      for (var i = 0; i < productsIds.length; i++) {
        const product = await Order.findById(productsIds[i]);
        products.push(product);
      }

      res.render('orders', {
        profile: user,
        orders: products.reverse()
      });
    } catch (err) {
      next(err)
    }
  },

  getOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      const shop = await User.findById(order.shop);
      const buyer = await User.findById(order.user);

      const product = await Product.findById(order.product)

      res.render('order', {
        shop: shop,
        product: product,
        buyer: buyer,
        order: order
      });
    } catch (err) {
      next(err)
    }
  },

  getLedgerOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      const shop = await User.findById(order.shop);
      const buyer = await User.findById(order.user);

      const product = await Product.findById(order.product)

      res.render('order-ledger', {
        shop: shop,
        product: product,
        buyer: buyer,
        order: order
      });
    } catch (err) {
      next(err)
    }
  },

  getLedger: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const orders = await Order.find({});

      res.render('ledger', {
        profile: user,
        orders: orders.reverse()
      });
    } catch (err) {
      next(err)
    }
  },

  cancelOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      if (order.admin_delivered == 1) {
        return res.redirect('back');
      }

      else {
        order.canceled = 1;
        order.delivered = 0;
        order.in_progress = 0;
        order.admin_delivered = 0;
        order.shop_delivered = 0;

        order.save();
      }

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  deliverOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      if (order.canceled == 1) {
        return res.redirect('back');
      }

      else {
        order.canceled = 0;
        order.delivered = 1;
        order.admin_delivered = 1;
        order.shop_delivered = 1;
        order.in_progress = 0;

        order.save();
      }

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  deliverShopOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      if (order.canceled == 1) {
        return res.redirect('back');
      }
      else {
        order.canceled = 0;
        order.shop_delivered = 1;

        order.save();
      }

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  deliverAdminOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      if (order.canceled == 1) {
        return res.redirect('back');
      }
      else {
        order.canceled = 0;
        order.delivered = 1;
        order.shop_delivered = 1;
        order.admin_delivered = 1;
        order.in_progress = 0;

        order.save();
      }

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  activeOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      if (order.admin_delivered == 1) {
        return res.redirect('back');
      }
      else {
        order.canceled = 0;
        order.delivered = 0;
        order.in_progress = 1;

        order.save();
      }

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

/*End Orders*/

/*Product Upload*/
  getProfileUpload: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);
      res.render('user-shop-upload', {profile: user});
    } catch (err) {
      next(err)
    }
  },

  uploadProduct: async (req, res, next) => {
    try {
       const userId = req.session.passport.user;
       const user = await User.findById(userId);
       const {discount, price,category,name,condition, currency, price_cut, description, product_video} = req.body;

       const images = [];
       var photos = req.files;

       for (var i = 0; i < photos.length; i++) {
         images.push(photos[i].filename);
       }

       var features = req.body.features.split('#');
       var specs = req.body.specs.split('#');
       var shipping = req.body.shipping.split('#');
       const review_count = 0;

       const product = new Product({
         name: name,
         discount: discount,
         price: price,
         price_cut: price_cut,
         features: features,
         condition: condition,
         category: category,
         currency: "$",
         specs: specs,
         shipping: shipping,
         description: description,
         product_image: req.files[0].filename,
         product_video: product_video,
         product_images: images,
         stock: 1,
         owner: userId,
         review_count: review_count
       });

       product.reviews;
       await product.save();
       user.shop_items.push(product);
       await user.save();

       res.redirect('/user/profile-shop')
    } catch (err) {
      next(err)
    }
  },

/*End Upload*/

/*Profile Wishlist*/
getProfileWishlist: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const productsIds = user.wishlist;
    const products = [];

    for (var i = 0; i < productsIds.length; i++) {
      const product = await Product.findById(productsIds[i]);
      if (product) {
        products.push(product);
      }
    }


    res.render('wishlist', {
      profile: user,
      wishlist: products.reverse()
    });
  } catch (err) {
    next(err)
  }
},

addToWishlist: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const productId = req.params.id;
    const product = await Product.findById(productId);

    var arr = user.wishlist;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == productId) {
          return res.redirect('/user/profile-wishlist');
        }
      }

    user.wishlist.push(productId);
    await user.save();

    res.redirect('/user/profile-wishlist')
  } catch (err) {
    next(err)
  }
},

/*End Wishlist*/

/*Password Reset*/
getReset: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      var messages = req.flash('error');
      var info = req.flash('info');
      res.render('forgot',{
        info: info,
        hasInfo: info.length>0,
        messages: messages,
        hasErrors: messages.length>0
      });
    } catch (err) {
      next(err)
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/reset-password');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },

        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
            type: "OAuth2",
            user: 'shopallonlinepvt@gmail.com',
            clientId: '573108330496-spftgieoki35osq00ghs8klc8791fkha.apps.googleusercontent.com',
            clientSecret: 'AzrfAjx3Z4QORyOiArsKI7md',
            refreshToken: '1//047eJFlbPj3_1CgYIARAAGAQSNwF-L9IrqJEzofKc4GsPwWVIkE001yOIPBlWnBGzKZ4Bi85XMnuwgG-yzUE-WRtOHQDJ4-bE8xE'
          }
          });
          var mailOptions = {
            to: user.email,
            from: 'shopallonlinepvt@gmail.com',
            subject: 'Shopall Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
         res.redirect('/reset-password');
      });

    } catch (err) {
      next(err)
    }
  },

  reset: async (req, res, next) => {
    try {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }

        var messages = req.flash('error');
        var success = req.flash('success');

        res.render('reset', {
          token: req.params.token,
          user: req.user,
          success: success,
          hasSuccess: success.length>0,
          messages: messages,
          hasErrors: messages.length>0
        });
      });
    } catch (err) {
      next(err)
    }
  },

  resetDone: async (req, res, next) => {
    try {
      async.waterfall([
        function(done) {
          User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
              req.flash('error', 'Password reset token is invalid or has expired.');
              return res.redirect('back');
            }

            user.password = user.encryptPassword(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          });
        },
        function(user, done) {
          var smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
            type: "OAuth2",
            user: 'shopallonlinepvt@gmail.com',
            clientId: '573108330496-spftgieoki35osq00ghs8klc8791fkha.apps.googleusercontent.com',
            clientSecret: 'AzrfAjx3Z4QORyOiArsKI7md',
            refreshToken: '1//047eJFlbPj3_1CgYIARAAGAQSNwF-L9IrqJEzofKc4GsPwWVIkE001yOIPBlWnBGzKZ4Bi85XMnuwgG-yzUE-WRtOHQDJ4-bE8xE'
          }
          });
          var mailOptions = {
            to: user.email,
            from: 'shopallonlinepvt@gmail.com',
            subject: 'Your password has been changed',
            text: `Hello, ${user.fullname} \n\n` +
              'This is a confirmation that the password for your account ' + user.email + ' on shopall.co.zw has just been changed.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('success', 'Success! Your password has been changed.');
            done(err);
          });
        }
      ], function(err) {
        res.redirect('/user/profile');
      });
    } catch (err) {
      next(err)
    }
  }

}
