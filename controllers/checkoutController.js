const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const About = require('../models/about');
const Contact = require('../models/contact');
const Service = require('../models/service');
const Order = require('../models/order');
const Review = require('../models/review');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

module.exports = {
  getCheckoutCard: async (req, res, next) => {
    try {
      if (!req.session.cart) {
        return res.redirect('/cart')
      }

      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.redirect('/cart')
      }

      const shop = await User.findById(product.owner);
      var cart = new Cart(req.session.cart);
      const products = cart.generateArray();

      var prod;
      for (var i = 0; i < products.length; i++) {
        if (products[i].item._id == productId) {
          prod = products[i];
        }
      }

      if (prod.qty == 0) {
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

  getCheckoutGateway: async (req, res, next) => {
    try {

      if (!req.session.cart) {
        return res.redirect('/cart')
      }

      const productId = req.params.id;
      const product = await Product.findById(productId)

      if (!product) {
        return res.redirect('/cart')
      }

      const shop = await User.findById(product.owner);

      var cart = new Cart(req.session.cart);
      const products = cart.generateArray();

      var prod;
      for (var i = 0; i < products.length; i++) {
        if (products[i].item._id == productId) {
          prod = products[i];
        }
      }

      if (prod.qty == 0) {
        return res.redirect('/cart')
      }

      var pcnt = product.discount;
      if (!product.discount) {
        pcnt = 0;
      }

      var subtotal = prod.qty * product.price;

      var discount = (pcnt * subtotal) / 100;
      var price = subtotal - discount;

      res.render('checkout-gateways', {
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

  getCheckoutMobile: async (req, res, next) => {
    try {

      if (!req.session.cart) {
        return res.redirect('/cart')
      }

      const productId = req.params.id;
      const product = await Product.findById(productId)

      if (!product) {
        return res.redirect('/cart')
      }

      const shop = await User.findById(product.owner);

      var cart = new Cart(req.session.cart);
      const products = cart.generateArray();

      var prod;
      for (var i = 0; i < products.length; i++) {
        if (products[i].item._id == productId) {
          prod = products[i];
        }
      }

      if (prod.qty == 0) {
        return res.redirect('/cart')
      }

      var pcnt = product.discount;
      if (!product.discount) {
        pcnt = 0;
      }

      var subtotal = prod.qty * product.price;

      var discount = (pcnt * subtotal) / 100;
      var price = subtotal - discount;

      res.render('checkout-mobile', {
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

      if (!req.session.cart) {
        return res.redirect('/cart')
      }

      const productId = req.params.id;
      const product = await Product.findById(productId)

      if (!product) {
        return res.redirect('/cart')
      }

      const shop = await User.findById(product.owner);

      var cart = new Cart(req.session.cart);
      const products = cart.generateArray();

      var prod;
      for (var i = 0; i < products.length; i++) {
        if (products[i].item._id == productId) {
          prod = products[i];
        }
      }

      if (prod.qty == 0) {
        return res.redirect('/cart')
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

  //Make Payments

  //Shopall pay
  checkoutShopall: async (req, res, next) => {
    try {
      if (!req.session.cart) {
        res.redirect('/cart')
      }
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      const productId = req.params.id;
      const product = await Product.findById(productId)

      var cart = new Cart(req.session.cart);
      const products = cart.generateArray();
      const shop = await User.findById(product.owner);

      var prod;
      for (var i = 0; i < products.length; i++) {
        if (products[i].item._id == productId) {
          prod = products[i];
        }
      }

      if (prod.qty == 0) {
        return res.redirect('/cart')
      }

      var pcnt = product.discount;
      if (!product.discount) {
        pcnt = 0;
      }

      var subtotal = prod.qty * product.price;
      var discount = (pcnt * subtotal) / 100;
      var price = subtotal - discount;
      var aPrice = Math.ceil(price);

      const date = Date.now();
      const created_at = new Date(date).toDateString();

      var num = Math.random().toExponential().split('e-');
      var num2 = num[0].split('.');
      var order_num = num2[1];

      const {name, nationalID, country, city, hnumber, bank, card_type, delivery_type, delivery_period,other_type, other_form, gateway_type, mobile_type} = req.body;

      const order = new Order({
        order_number: order_num,
        product: product,
        shop: shop,
        canceled: 0,
        delivered: 0,
        shop_delivered: 0,
        admin_delivered: 0,
        in_progress: 1,
        quantity: prod.qty,
        currency: product.currency,
        price: Math.ceil(price),
        date: created_at,
        name: name,
        phone: user.cell,
        nationalID: nationalID,
        country: country,
        city: city,
        hnumber: hnumber,
        bank: bank,
        card_type: card_type,
        delivery_type: delivery_type,
        delivery_period: delivery_period,
        other_form: other_form,
        other_type: other_type,
        gateway_type: gateway_type,
        mobile_type: mobile_type,
        user: user
      });

      await order.save();

      const users = await User.find({});
      for (var i = 0; i < users.length; i++) {
        users[i].ledger.push(order);
        await users[i].save();
      }

      var transporter = nodemailer.createTransport({
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
      })

      var mailOptions = {
          from: user.email, // listed in rfc822 message header
          to: shop.email, // listed in rfc822 message header
          subject: `${user.fullname} ordered ${product.name}`,
          text: `${user.fullname} has just ordered | (${prod.qty}) ${product.name} | from shopall.co.zw. Review the full Order here shopall.co.zw/order/${order._id}.`

      }

      transporter.sendMail(mailOptions, function (err, res) {
          if(err){
              console.log(err);
          }
      });

      var prodqty = prod.qty;
      var cart = new Cart(req.session.cart);
      for (var i = 0; i < prodqty; i++) {
        cart.remove(product, product.id);
      }
      req.session.cart = cart;

      shop.shop_orders.push(order);
      await shop.save();
      user.orders.push(order);
      await user.save();

      res.render('purchase-status', {
        user: user,
        shop: shop,
        product: product,
        order: order
      });

    } catch (err) {
      next(err)
    }
  },


}
