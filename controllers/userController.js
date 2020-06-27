const express = require('express');
const User = require('../models/user');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist');
const passport = require('passport');
const fs = require('fs');

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

  addToOrders: async (req, res, next) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findById(userId);
      const productId = req.params.id;
      const product = await Product.findById(productId);

      var cart = new Cart(req.session.cart);
      const products = cart.generateArray();

      var prod;
      for (var i = 0; i < products.length; i++) {
        if (products[i].item._id == productId) {
          prod = products[i];
        }
      }

      var pcnt = product.discount;
      if (!product.discount) {
        pcnt = 0;
      }

      var subtotal = prod.qty * product.price;
      var discount = (pcnt * subtotal) / 100;
      var price = subtotal - discount;

      const date = Date.now();
      const created_at = new Date(date).toDateString();

      var num = Math.random().toExponential().split('e-');
      var num2 = num[0].split('.');
      var order_num = num2[1];

      const order = new Order({
        order_number: order_num,
        product_id: product._id,
        canceled: 0,
        delivered: 0,
        in_progress: 1,
        currency: product.currency,
        price: price,
        date: created_at
      });

      await order.save();
      user.orders.push(order);
      await user.save();

      res.redirect('/user/profile-orders')
    } catch (err) {
      next(err)
    }
  },

  cancelOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      order.canceled = 1;
      order.delivered = 0;
      order.in_progress = 0;

      order.save();
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  deliverOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      order.canceled = 0;
      order.delivered = 1;
      order.in_progress = 0;

      order.save();
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  activeOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);

      order.canceled = 0;
      order.delivered = 0;
      order.in_progress = 1;

      order.save();
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
      const product = await Wishlist.findById(productsIds[i]);
      products.push(product);
    }

    var wishlist = [];
    for (var i = 0; i < products.length; i++) {
      var og = await Product.findById(products[i].product);
      products[i].stock = og.stock;
      if (products[i].stock == 0) {
        products[i].stock = null;
      }

      products[i].price = og.price;
      products[i].price_cut = og.price_cut;

      wishlist.push(products[i]);
    }

    res.render('wishlist', {
      profile: user,
      wishlist: wishlist.reverse()
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

    const wishlist = new Wishlist({
      name: product.name,
      stock: product.stock,
      currency: product.currency,
      product: product._id,
      image: product.product_image,
      price: product.price,
      price_cut: product.price_cut
    });

    await wishlist.save();
    user.wishlist.push(wishlist);
    await user.save();

    res.redirect('/user/profile-wishlist')
  } catch (err) {
    next(err)
  }
},

/*End Wishlist*/


}
