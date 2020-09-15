const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

module.exports = {
  getClothing: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Women's Clothing" || product[i].category == "Men's Clothing" || product[i].category == "Boys' Clothing" || product[i].category == "Girls' Clothing") {
          clothing.push(product[i]);
        }
      }

      var ref = "/categories/clothing";

      res.render('single-category', {
        products: clothing.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  clothingSearch: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Clothing";
      const search = req.body.searchProduct;

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Women's Clothing" || product[i].category == "Men's Clothing" || product[i].category == "Boys' Clothing" || product[i].category == "Girls' Clothing") {
          clothing.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < clothing.length; i++) {
        if (clothing[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC1: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Women's Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Women's Clothing") {
          clothing.push(product[i]);
        }
      }

      var ref = "/categories/women_clothing";

      res.render('single-category', {
        products: clothing.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c1Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Women's Clothing";
      const search = req.body.searchProduct;

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Women's Clothing") {
          clothing.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < clothing.length; i++) {
        if (clothing[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC2: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Men's Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Men's Clothing") {
          clothing.push(product[i]);
        }
      }

      var ref = "/categories/men_clothing";

      res.render('single-category', {
        products: clothing.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c2Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Men's Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Men's Clothing") {
          clothing.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < clothing.length; i++) {
        if (clothing[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC3: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Boys' Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Boys' Clothing") {
          clothing.push(product[i]);
        }
      }

      var ref = "/categories/boys_clothing";

      res.render('single-category', {
        products: clothing.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c3Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Boys' Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Boys' Clothing") {
          clothing.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < clothing.length; i++) {
        if (clothing[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC4: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Girls' Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Girls' Clothing") {
          clothing.push(product[i]);
        }
      }

      var ref = "/categories/girls_clothing";

      res.render('single-category', {
        products: clothing.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c4Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Girls' Clothing";

      var clothing = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Girls' Clothing") {
          clothing.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < clothing.length; i++) {
        if (clothing[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
        if (clothing[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(clothing[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC5: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Computers & Accessories";

      var computers = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Computers & Accessories") {
          computers.push(product[i]);
        }
      }

      var ref = "/categories/computers_and_accessories";

      res.render('single-category', {
        products: computers.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c5Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Computers & Accessories";

      var computers = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Computers & Accessories") {
          computers.push(product[i]);
        }
      }


      var productsFound = [];
      for (var i = 0; i < computers.length; i++) {
        if (computers[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(computers[i]);
        }
        if (computers[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(computers[i]);
        }
        if (computers[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(computers[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC6: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Food & Groceries";

      var food_grocery = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Food & Groceries") {
          food_grocery.push(product[i]);
        }
      }

      var ref = "/categories/food_and_groceries";

      res.render('single-category', {
        products: food_grocery.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c6Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Food & Groceries";

      var food_grocery = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Food & Groceries") {
          food_grocery.push(product[i]);
        }
      }
      var productsFound = [];
      for (var i = 0; i < food_grocery.length; i++) {
        if (food_grocery[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(food_grocery[i]);
        }
        if (food_grocery[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(food_grocery[i]);
        }
        if (food_grocery[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(food_grocery[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC7: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Tv, Video & Audio";

      var tv_audio_video = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Tv, Video & Audio") {
          tv_audio_video.push(product[i]);
        }
      }

      var ref = "/categories/tv_audio_video";

      res.render('single-category', {
        products: tv_audio_video.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c7Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Tv, Video & Audio";

      var tv_audio_video = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Tv, Video & Audio") {
          tv_audio_video.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < tv_audio_video.length; i++) {
        if (tv_audio_video[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(tv_audio_video[i]);
        }
        if (tv_audio_video[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(tv_audio_video[i]);
        }
        if (tv_audio_video[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(tv_audio_video[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC8: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Smartphones & Tablets";

      var smartphones_tablets = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Smartphones & Tablets") {
          smartphones_tablets.push(product[i]);
        }
      }

      var ref = "/categories/smartphones_and_tablets";

      res.render('single-category', {
        products: smartphones_tablets.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c8Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Smartphones & Tablets";

      var smartphones_tablets = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Smartphones & Tablets") {
          smartphones_tablets.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < smartphones_tablets.length; i++) {
        if (smartphones_tablets[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(smartphones_tablets[i]);
        }
        if (smartphones_tablets[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(smartphones_tablets[i]);
        }
        if (smartphones_tablets[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(smartphones_tablets[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC9: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Cameras, Photo & Video";

      var cameras_photo_video = []
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Cameras, Photo & Video") {
          cameras_photo_video.push(product[i]);
        }
      }

      var ref = "/categories/cameras_photo_video";

      res.render('single-category', {
        products: cameras_photo_video.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c9Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Cameras, Photo & Video";

      var cameras_photo_video = []
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Cameras, Photo & Video") {
          cameras_photo_video.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < cameras_photo_video.length; i++) {
        if (cameras_photo_video[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(cameras_photo_video[i]);
        }
        if (cameras_photo_video[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(cameras_photo_video[i]);
        }
        if (cameras_photo_video[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(cameras_photo_video[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC10: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Headphones";

      var headphones = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Headphones") {
          headphones.push(product[i]);
        }
      }

      var ref = "/categories/headphones";

      res.render('single-category', {
        products: headphones.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c10Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Headphones";

      var headphones = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Headphones") {
          headphones.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < headphones.length; i++) {
        if (headphones[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(headphones[i]);
        }
        if (headphones[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(headphones[i]);
        }
        if (headphones[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(headphones[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC11: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Electronics";

      var electronics = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Electronics") {
          electronics.push(product[i]);
        }
      }

      var ref = "/categories/electronics";

      res.render('single-category', {
        products: electronics.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c11Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Electronics";

      var electronics = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Electronics") {
          electronics.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < electronics.length; i++) {
        if (electronics[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(electronics[i]);
        }
        if (electronics[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(electronics[i]);
        }
        if (electronics[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(electronics[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC12: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Video Games";

      var games = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Video Games") {
          games.push(product[i]);
        }
      }

      var ref = "/categories/video_games";

      res.render('single-category', {
        products: games.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c12Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Video Games";

      var games = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Video Games") {
          games.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < games.length; i++) {
        if (games[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(games[i]);
        }
        if (games[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(games[i]);
        }
        if (games[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(games[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC13: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Toys & Games";

      var toys = []
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Toys & Games") {
          toys.push(product[i]);
        }
      }

      var ref = "/categories/toys_and_games";

      res.render('single-category', {
        products: toys.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c13Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Toys & Games";

      var toys = []
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Toys & Games") {
          toys.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < toys.length; i++) {
        if (toys[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(toys[i]);
        }
        if (toys[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(toys[i]);
        }
        if (toys[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(toys[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC14: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Beauty & Personal Care";

      var beauty = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Beauty & Personal Care") {
          beauty.push(product[i]);
        }
      }

      var ref = "/categories/beauty_and_personal_care";

      res.render('single-category', {
        products: beauty.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c14Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Beauty & Personal Care";

      var beauty = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Beauty & Personal Care") {
          beauty.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < beauty.length; i++) {
        if (beauty[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(beauty[i]);
        }
        if (beauty[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(beauty[i]);
        }
        if (beauty[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(beauty[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC15: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Books";

      var books = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Books") {
          books.push(product[i]);
        }
      }

      var ref = "/categories/books";

      res.render('single-category', {
        products: books.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c15Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Books";

      var books = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Books") {
          books.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < books.length; i++) {
        if (books[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(books[i]);
        }
        if (books[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(books[i]);
        }
        if (books[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(books[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC16: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Stationary";

      var stationary = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Stationary") {
          stationary.push(product[i]);
        }
      }

      var ref = "/categories/stationary";

      res.render('single-category', {
        products: stationary.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c16Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Stationary";

      var stationary = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Stationary") {
          stationary.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < stationary.length; i++) {
        if (stationary[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(stationary[i]);
        }
        if (stationary[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(stationary[i]);
        }
        if (stationary[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(stationary[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC17: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Furniture & Homewares";

      var furniture_homewares = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Furniture & Homewares") {
          furniture_homewares.push(product[i]);
        }
      }

      var ref = "/categories/furniture_and_homewares";

      res.render('single-category', {
        products: furniture_homewares.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c17Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Furniture & Homewares";

      var furniture_homewares = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Furniture & Homewares") {
          furniture_homewares.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < furniture_homewares.length; i++) {
        if (furniture_homewares[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(furniture_homewares[i]);
        }
        if (furniture_homewares[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(furniture_homewares[i]);
        }
        if (furniture_homewares[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(furniture_homewares[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC18: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Industrial & Scientific";

      var industry = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Industrial & Scientific") {
          industry.push(product[i]);
        }
      }

      var ref = "/categories/industrial_and_scientific";

      res.render('single-category', {
        products: industry.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c18Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Industrial & Scientific";

      var industry = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Industrial & Scientific") {
          industry.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < industry.length; i++) {
        if (industry[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(industry[i]);
        }
        if (industry[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(industry[i]);
        }
        if (industry[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(industry[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC19: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Alcohol";

      var alcohol = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Alcohol") {
          alcohol.push(product[i]);
        }
      }

      var ref = "/categories/alcohol";

      res.render('single-category', {
        products: alcohol.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c19Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Alcohol";

      var alcohol = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Alcohol") {
          alcohol.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < alcohol.length; i++) {
        if (alcohol[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(alcohol[i]);
        }
        if (alcohol[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(alcohol[i]);
        }
        if (alcohol[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(alcohol[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC20: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Health & Household";

      var health = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Health & Household") {
          health.push(product[i]);
        }
      }

      var ref = "/categories/health_and_household";

      res.render('single-category', {
        products: health.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c20Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Health & Household";

      var health = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Health & Household") {
          health.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < health.length; i++) {
        if (health[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(health[i]);
        }
        if (health[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(health[i]);
        }
        if (health[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(health[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC21: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Tools & Garden";

      var garden = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Tools & Garden") {
          garden.push(product[i]);
        }
      }

      var ref = "/categories/tools_and_garden";

      res.render('single-category', {
        products: garden.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c21Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Tools & Garden";

      var garden = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Tools & Garden") {
          garden.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < garden.length; i++) {
        if (garden[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(garden[i]);
        }
        if (garden[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(garden[i]);
        }
        if (garden[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(garden[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC22: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Sports & Outdoor";

      var sports_outdoor = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Sports & Outdoor") {
          sports_outdoor.push(product[i]);
        }
      }

      var ref = "/categories/sports_and_outdoor";

      res.render('single-category', {
        products: sports_outdoor.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c22Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Sports & Outdoor";

      var sports_outdoor = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Sports & Outdoor") {
          sports_outdoor.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < sports_outdoor.length; i++) {
        if (sports_outdoor[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(sports_outdoor[i]);
        }
        if (sports_outdoor[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(sports_outdoor[i]);
        }
        if (sports_outdoor[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(sports_outdoor[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC23: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Media House";

      var media_house = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Media House") {
          media_house.push(product[i]);
        }
      }

      var ref = "/categories/media_house";

      res.render('single-category', {
        products: media_house.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c23Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Media House";

      var media_house = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Media House") {
          media_house.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < media_house.length; i++) {
        if (media_house[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(media_house[i]);
        }
        if (media_house[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(media_house[i]);
        }
        if (media_house[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(media_house[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC24: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Farming";

      var farming = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Farming") {
          farming.push(product[i]);
        }
      }

      var ref = "/categories/farming";

      res.render('single-category', {
        products: farming.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c24Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Farming";

      var farming = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Farming") {
          farming.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < farming.length; i++) {
        if (farming[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(farming[i]);
        }
        if (farming[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(farming[i]);
        }
        if (farming[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(farming[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC25: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Software";

      var software = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Software") {
          software.push(product[i]);
        }
      }

      var ref = "/categories/software";

      res.render('single-category', {
        products: software.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c25Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Software";

      var software = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Software") {
          software.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < software.length; i++) {
        if (software[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(software[i]);
        }
        if (software[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(software[i]);
        }
        if (software[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(software[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC26: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Bags & Luggage";

      var bags_luggage = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Bags & Luggage") {
          bags_luggage.push(product[i]);
        }
      }

      var ref = "/categories/bags_and_luggage";

      res.render('single-category', {
        products: bags_luggage.reverse(),
        category: category
      })
    } catch (err) {
      next(err)
    }
  },

  c26Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Bags & Luggage";

      var bags_luggage = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Bags & Luggage") {
          bags_luggage.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < bags_luggage.length; i++) {
        if (bags_luggage[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(bags_luggage[i]);
        }
        if (bags_luggage[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(bags_luggage[i]);
        }
        if (bags_luggage[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(bags_luggage[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC27: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Shoes";

      var shoes = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Shoes") {
          shoes.push(product[i]);
        }
      }

      var ref = "/categories/shoes";

      res.render('single-category', {
        products: shoes.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c27Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Shoes";

      var shoes = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Shoes") {
          shoes.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < shoes.length; i++) {
        if (shoes[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(shoes[i]);
        }
        if (shoes[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(shoes[i]);
        }
        if (shoes[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(shoes[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC28: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Jewellery";

      var jewellery = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Jewellery") {
          jewellery.push(product[i]);
        }
      }

      var ref = "/categories/jewellery";

      res.render('single-category', {
        products: jewellery.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c28Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Jewellery";

      var jewellery = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Jewellery") {
          jewellery.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < jewellery.length; i++) {
        if (jewellery[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(jewellery[i]);
        }
        if (jewellery[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(jewellery[i]);
        }
        if (jewellery[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(jewellery[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC29: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Arts & Crafts";

      var arts = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Arts & Crafts") {
          arts.push(product[i]);
        }
      }

      var ref = "/categories/arts_and_crafts";

      res.render('single-category', {
        products: arts.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c29Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Arts & Crafts";

      var arts = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Arts & Crafts") {
          arts.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < arts.length; i++) {
        if (arts[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(arts[i]);
        }
        if (arts[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(arts[i]);
        }
        if (arts[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(arts[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC30: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Services";

      var services = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Services") {
          services.push(product[i]);
        }
      }

      var ref = "/categories/services";

      res.render('single-category', {
        products: services.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c30Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Services";

      var services = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Services") {
          services.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < services.length; i++) {
        if (services[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(services[i]);
        }
        if (services[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(services[i]);
        }
        if (services[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(services[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC31: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Baby Products";

      var baby = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Baby Products") {
          baby.push(product[i]);
        }
      }

      var ref = "/categories/baby_products";

      res.render('single-category', {
        products: baby.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c31Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Baby Products";

      var baby = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Baby Products") {
          baby.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < baby.length; i++) {
        if (baby[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(baby[i]);
        }
        if (baby[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(baby[i]);
        }
        if (baby[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(baby[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC32: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Home & Kitchen";

      var home = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Home & Kitchen") {
          home.push(product[i]);
        }
      }

      var ref = "/categories/home_and_kitchen";

      res.render('single-category', {
        products: home.reverse(),
        category: category,
        ref
      })
    } catch (err) {
      next(err)
    }
  },

  c32Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Home & Kitchen";

      var home = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Home & Kitchen") {
          home.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < home.length; i++) {
        if (home[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(home[i]);
        }
        if (home[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(home[i]);
        }
        if (home[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(home[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

  getC33: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const category = "Others";

      var others = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Others") {
          others.push(product[i]);
        }
      }

      var ref = "/categories/other";

      res.render('single-category', {
        products: others.reverse(),
        category: category,
        ref: ref
      })
    } catch (err) {
      next(err)
    }
  },

  c33Search: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const search = req.body.searchProduct;

      const category = "Others";

      var others = [];
      for (var i = 0; i < product.length; i++) {
        if (product[i].category == "Others") {
          others.push(product[i]);
        }
      }

      var productsFound = [];
      for (var i = 0; i < others.length; i++) {
        if (others[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(others[i]);
        }
        if (others[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(others[i]);
        }
        if (others[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(others[i]);
        }
      }

      res.render('single-category', {
        products: productsFound.reverse(),
        category: category,
        search: search
      })
    } catch (err) {
      next(err)
    }
  },

}
