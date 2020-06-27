const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const About = require('../models/about');
const Contact = require('../models/contact');
const Service = require('../models/service');
const Order = require('../models/order');
const Review = require('../models/review');

module.exports = {
  getCheckoutCard: async (req, res, next) => {
    try {
      if (!req.session.cart) {
        return res.redirect('/cart')
      }
      const productId = req.params.id;
      const product = await Product.findById(productId)

      const shop = await User.findById(product.owner);
      var cart = new Cart(req.session.cart);
      const products = cart.generateArray();

      var prod;
      for (var i = 0; i < products.length; i++) {
        if (products[i].item._id == productId) {
          prod = products[i];
        }
      }

      if (!prod.price) {
        return res.redirect('/cart')
      }

      var pcnt = product.discount;
      if (!product.discount) {
        pcnt = 0;
      }

      var subtotal = prod.qty * product.price;
      var discount = (pcnt * subtotal) / 100;
      var price = subtotal - discount;

      res.render('checkout-card', {
        product: product,
        qty: prod.qty,
        discount: pcnt,
        shop: shop,
        subtotal: subtotal,
        price: Math.ceil(price)
      })
    } catch (err) {
      next(err)
    }
  },

  getCheckoutOneMoney: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId)

      const shop = await User.findById(product.owner);

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

      res.render('checkout-onemoney', {
        product: product,
        qty: prod.qty,
        discount: pcnt,
        shop: shop,
        subtotal: subtotal,
        price: Math.ceil(price)
      })
    } catch (err) {
      next(err)
    }
  },

  getCheckoutEcocash: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId)

      const shop = await User.findById(product.owner);

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

      res.render('checkout-ecocash', {
        product: product,
        qty: prod.qty,
        discount: pcnt,
        shop: shop,
        subtotal: subtotal,
        price: Math.ceil(price)
      })
    } catch (err) {
      next(err)
    }
  },

  getCheckoutOther: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId)

      const shop = await User.findById(product.owner);

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

      res.render('checkout-other', {
        product: product,
        qty: prod.qty,
        discount: pcnt,
        shop: shop,
        subtotal: subtotal,
        price: Math.ceil(price)
      })
    } catch (err) {
      next(err)
    }
  },
}


/*.then(() => {
  stripe.charges.create({
    amount: aPrice * 100,
    description: product.name,
    source: req.body.stripeToken,
    currency: "usd"
  }, function(err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    req.flash('success', 'Successfuly bought the Product');
    var cart = new Cart(req.session.cart);
    cart.remove(product, product.id);
    req.session.cart = cart;
    paymentId = charge.id;
    res.redirect('/user/profile-orders')

    name: req.user.fullname,
    phone: req.user.cell,
    address: req.user.address,
  })
})*/
