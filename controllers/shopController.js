const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const About = require('../models/about');
const Contact = require('../models/contact');
const Service = require('../models/service');
const Social = require('../models/socials');
const Order = require('../models/order');
const Review = require('../models/review');
const Team = require('../models/team');

module.exports = {
  index: async (req, res, next) => {
    try {

      const newproducts = await Product.find({});
      var recomd = [];
      var topseller = [];
      var bestrated = [];
      var shopall = [];
      const shopProduct = await Product.find({});
      for (var i = 0; i < shopProduct.length; i++) {
        if (shopProduct[i].is_top == 1) {
          topseller.push(shopProduct[i]);
        }

        if (shopProduct[i].is_rated == 1) {
          bestrated.push(shopProduct[i]);
        }

        if (shopProduct[i].is_recom == 1) {
          recomd.push(shopProduct[i]);
        }

        if (shopProduct[i].is_shopall == 1) {
          shopall.push(shopProduct[i]);
        }
      }

      const socials = await Social.find({});
      var social;
      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

      if (!req.session.cart) {

        return res.render('index', {
          products: shopall.slice((shopall.length - 10)).reverse(),
          newproducts: newproducts.slice((newproducts.length - 5)).reverse(),
          recomd: recomd.slice((recomd.length - 18)).reverse(),
          topseller: topseller.slice((topseller.length - 5)).reverse(),
          bestrated: bestrated.slice((bestrated.length - 5)).reverse(),
          socials: social,
          cart: null
        })
      }

      var cart_products = [];
      var mycart = new Cart(req.session.cart);
      const cart_product = mycart.generateArray();
      for (var i = 0; i < cart_product.length; i++) {
        if (cart_product[i].qty != 0) {
          cart_products.push(cart_product[i])
        }
      }


      res.render('index', {
        products: shopall.slice((shopall.length - 10)).reverse(),
        newproducts: newproducts.slice((newproducts.length - 5)).reverse(),
        recomd: recomd.slice((recomd.length - 18)).reverse(),
        topseller: topseller.slice((topseller.length - 5)).reverse(),
        bestrated: bestrated.slice((bestrated.length - 5)).reverse(),
        socials: social,
        cart: cart_products.slice((cart_products.length - 4)).reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  getShop: async (req, res, next) => {
    try {
      const shopId = req.params.id;
      const shop = await User.findById(shopId);

      if (!shop) {
        return res.redirect("/shops");
      }

      const recents = await Product.find({});

      const productsIds = shop.shop_items;
      const products = [];
      for (var i = 0; i < productsIds.length; i++) {
        const product = await Product.findById(productsIds[i]);
        products.push(product);
      }

      /*Categories*/
      const categories = await Product.find({});
      var women = [];
      var men = [];
      var boys = [];
      var girls = [];
      var baby = [];
      var media = [];
      var games = [];
      var toys = [];
      var software = [];
      var computers = [];
      var phones = [];
      var electronics = [];
      var jewellery = [];
      var shoes = [];
      var beauty = [];
      var food = [];
      var alcohol = [];
      var sports = [];
      var farming = [];
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].category == "Women's Clothing") {
          women.push(categories[i]);
        }
        else if (categories[i].category == "Men's Clothing") {
          men.push(categories[i]);
        }
        else if (categories[i].category == "Boys' Clothing") {
          boys.push(categories[i]);
        }
        else if (categories[i].category == "Girls' Clothing") {
          girls.push(categories[i]);
        }
        else if (categories[i].category == "Baby Products") {
          baby.push(categories[i]);
        }
        else if (categories[i].category == "Media House") {
          media.push(categories[i]);
        }
        else if (categories[i].category == "Video Games") {
          games.push(categories[i]);
        }
        else if (categories[i].category == "Toys & Games") {
          toys.push(categories[i]);
        }
        else if (categories[i].category == "Software") {
          software.push(categories[i]);
        }
        else if (categories[i].category == "Computers & Accessories") {
          computers.push(categories[i]);
        }
        else if (categories[i].category == "Smartphones & Tablets") {
          phones.push(categories[i]);
        }
        else if (categories[i].category == "Electronics") {
          electronics.push(categories[i]);
        }
        else if (categories[i].category == "Jewellery") {
          jewellery.push(categories[i]);
        }
        else if (categories[i].category == "Shoes") {
          shoes.push(categories[i]);
        }
        else if (categories[i].category == "Beauty & Personal Care") {
          beauty.push(categories[i]);
        }
        else if (categories[i].category == "Food & Groceries") {
          food.push(categories[i]);
        }
        else if (categories[i].category == "Alcohol") {
          alcohol.push(categories[i]);
        }
        else if (categories[i].category == "Sports & Outdoor") {
          sports.push(categories[i]);
        }
        else if (categories[i].category == "Farming") {
          farming.push(categories[i]);
        }
      }
      /*End Categories*/

      res.render('shop',
       {
         products: products.reverse(),
         shop: shop,
         recents: recents.slice((recents.length - 3)).reverse(),
         women: women.length,
         men: men.length,
         boys: boys.length,
         girls: girls.length,
         baby: baby.length,
         media: media.length,
         games: games.length,
         toys: toys.length,
         software: software.length,
         computers: computers.length,
         phones: phones.length,
         electronics: electronics.length,
         jewellery: jewellery.length,
         shoes: shoes.length,
         beauty: beauty.length,
         food: food.length,
         alcohol: alcohol.length,
         sports: sports.length,
         farming: farming.length
       })
    } catch (err) {
      next(err)
    }
  },

  searchShop: async (req, res, next) => {
    try {
      const shopId = req.params.id;
      const shop = await User.findById(shopId);
      const recents = await Product.find({});

      const productsIds = shop.shop_items;
      const products = [];
      for (var i = 0; i < productsIds.length; i++) {
        const product = await Product.findById(productsIds[i]);
        products.push(product);
      }

      /*Categories*/
      const categories = await Product.find({});
      var women = [];
      var men = [];
      var boys = [];
      var girls = [];
      var baby = [];
      var media = [];
      var games = [];
      var toys = [];
      var software = [];
      var computers = [];
      var phones = [];
      var electronics = [];
      var jewellery = [];
      var shoes = [];
      var beauty = [];
      var food = [];
      var alcohol = [];
      var sports = [];
      var farming = [];
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].category == "Women's Clothing") {
          women.push(categories[i]);
        }
        else if (categories[i].category == "Men's Clothing") {
          men.push(categories[i]);
        }
        else if (categories[i].category == "Boys' Clothing") {
          boys.push(categories[i]);
        }
        else if (categories[i].category == "Girls' Clothing") {
          girls.push(categories[i]);
        }
        else if (categories[i].category == "Baby Products") {
          baby.push(categories[i]);
        }
        else if (categories[i].category == "Media House") {
          media.push(categories[i]);
        }
        else if (categories[i].category == "Video Games") {
          games.push(categories[i]);
        }
        else if (categories[i].category == "Toys & Games") {
          toys.push(categories[i]);
        }
        else if (categories[i].category == "Software") {
          software.push(categories[i]);
        }
        else if (categories[i].category == "Computers & Accessories") {
          computers.push(categories[i]);
        }
        else if (categories[i].category == "Smartphones & Tablets") {
          phones.push(categories[i]);
        }
        else if (categories[i].category == "Electronics") {
          electronics.push(categories[i]);
        }
        else if (categories[i].category == "Jewellery") {
          jewellery.push(categories[i]);
        }
        else if (categories[i].category == "Shoes") {
          shoes.push(categories[i]);
        }
        else if (categories[i].category == "Beauty & Personal Care") {
          beauty.push(categories[i]);
        }
        else if (categories[i].category == "Food & Groceries") {
          food.push(categories[i]);
        }
        else if (categories[i].category == "Alcohol") {
          alcohol.push(categories[i]);
        }
        else if (categories[i].category == "Sports & Outdoor") {
          sports.push(categories[i]);
        }
        else if (categories[i].category == "Farming") {
          farming.push(categories[i]);
        }
      }
      /*End Categories*/

      const search = req.body.search;

      var productsFound = [];
      for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(products[i]);
        }
        if (products[i].category.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(products[i]);
        }
        if (products[i].description.toLowerCase().includes(search.toLowerCase())) {
          productsFound.push(products[i]);
        }
      }

      res.render('shop', {
        shop: shop,
        search: search,
        products: productsFound,
        recents: recents.slice((recents.length - 3)).reverse(),
        women: women.length,
        men: men.length,
        boys: boys.length,
        girls: girls.length,
        baby: baby.length,
        media: media.length,
        games: games.length,
        toys: toys.length,
        software: software.length,
        computers: computers.length,
        phones: phones.length,
        electronics: electronics.length,
        jewellery: jewellery.length,
        shoes: shoes.length,
        beauty: beauty.length,
        food: food.length,
        alcohol: alcohol.length,
        sports: sports.length,
        farming: farming.length
      })
    } catch (err) {
      next(err)
    }
  },

  getShops: async (req, res, next) => {
    try {
      const product = await Product.find({});
      const shops = await User.find({});
      res.render('shops', {products: product, shops: shops.reverse()})
    } catch (err) {
      next(err)
    }
  },

  getCatagories: async (req, res, next) => {
    try {
      const product = await Product.find({});
      res.render('categories', {products: product})
    } catch (err) {
      next(err)
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.redirect("/");
      }

      var category = product.category;
      var ref;
      if (category == "Women's Clothing") {
        ref = '/categories/women_clothing'
      }
      else if (category == "Men's Clothing") {
        ref = '/categories/men_clothing'
      }
      else if (category == "Boys' Clothing") {
        ref = '/categories/boys_clothing'
      }
      else if (category == "Girls' Clothing") {
        ref = '/categories/girls_clothing'
      }
      else if (category == "Computers & Accessories") {
        ref = '/categories/computers_and_accessories'
      }
      else if (category == "Food & Groceries") {
        ref = '/categories/food_and_groceries'
      }
      else if (category == "Tv, Video & Audio") {
        ref = '/categories/tv_audio_video'
      }
      else if (category == "Smartphones & Tablets") {
        ref = '/categories/smartphones_and_tablets'
      }
      else if (category == "Cameras, Photo & Video") {
        ref = '/categories/cameras_photo_video'
      }
      else if (category == "Headphones") {
        ref = '/categories/headphones'
      }
      else if (category == "Electronics") {
        ref = '/categories/electronics'
      }
      else if (category == "Video Games") {
        ref = '/categories/video_games'
      }
      else if (category == "Toys & Games") {
        ref = '/categories/toys_and_games'
      }
      else if (category == "Beauty & Personal Care") {
        ref = '/categories/beauty_and_personal_care'
      }
      else if (category == "Books") {
        ref = '/categories/books'
      }
      else if (category == "Stationary") {
        ref = '/categories/stationary'
      }
      else if (category == "Furniture & Homewares") {
        ref = '/categories/furniture_and_homewares'
      }
      else if (category == "Industrial & Scientific") {
        ref = '/categories/industrial_and_scientific'
      }
      else if (category == "Alcohol") {
        ref = '/categories/alcohol'
      }
      else if (category == "Health & Household") {
        ref = '/categories/health_and_household'
      }
      else if (category == "Tools & Garden") {
        ref = '/categories/tools_and_garden'
      }
      else if (category == "Sports & Outdoor") {
        ref = '/categories/sports_and_outdoor'
      }
      else if (category == "Media House") {
        ref = '/categories/media_house'
      }
      else if (category == "Farming") {
        ref = '/categories/farming'
      }
      else if (category == "Software") {
        ref = '/categories/software'
      }
      else if (category == "Bags & Luggage") {
        ref = '/categories/bags_and_luggage'
      }
      else if (category == "Shoes") {
        ref = '/categories/shoes'
      }
      else if (category == "Jewellery") {
        ref = '/categories/jewellery'
      }
      else if (category == "Arts & Crafts") {
        ref = '/categories/arts_and_crafts'
      }
      else if (category == "Services") {
        ref = '/categories/services'
      }
      else if (category == "Baby Products") {
        ref = '/categories/baby_products'
      }
      else if (category == "Home & Kitchen") {
        ref = '/categories/home_and_kitchen'
      }
      else {
        ref = '/categories/other';
      }

      const shop = await User.findById(product.owner);
      const ids = product.reviews;
      const reviews = [];
      const reviews_quick = [];

      var {one, two, three, four, five} = 0;
      for (var i = 0; i < ids.length; i++) {
        const review = await Review.findById(ids[i]);
        if (review.rating == 1) {
          review.one = 1;
        }
        else if (review.rating == 2) {
          review.two = 1
        }
        else if (review.rating == 3) {
          review.three = 1;
        }
        else if (review.rating == 4) {
          review.four = 1
        }
        else if (review.rating == 5) {
          review.five = 1
        }
        reviews.push(review);
        reviews_quick.push(review);
      }

      const products = await Product.find({});
      var related = [];
      for (var i = 0; i < products.length; i++) {
        if (products[i].category == product.category) {
          related.push(products[i])
        }
      }


      var five_rating = 0;var cinco = [];
      var four_rating = 0;var quatro = [];
      var three_rating = 0;var thres = [];
      var two_rating = 0;var dos = [];
      var one_rating = 0;var uno = [];
      for (var i = 0; i < reviews.length; i++) {
        if (reviews[i].rating == 5) {
          five_rating = reviews[i].rating + five_rating;
          cinco.push(reviews[i]);
        }
        else if (reviews[i].rating == 4) {
          four_rating = reviews[i].rating + four_rating;
          quatro.push(reviews[i]);
        }
        else if (reviews[i].rating == 3) {
          three_rating = reviews[i].rating + three_rating;
          thres.push(reviews[i]);
        }
        else if (reviews[i].rating == 2) {
          two_rating = reviews[i].rating + two_rating;
          dos.push(reviews[i]);
        }
        else if (reviews[i].rating == 1) {
          one_rating = reviews[i].rating + one_rating;
          uno.push(reviews[i]);
        }
      }


      const firstPart = ((5*five_rating) + (4*four_rating) + (3*three_rating) + (2*two_rating) + (1*one_rating));
      const lastPart = (five_rating+four_rating+three_rating+two_rating+one_rating);
      const averageRating = firstPart / lastPart;

      /*Rating %*/
      var r1 = (one_rating / lastPart) * 100;
      var r2 = (two_rating / lastPart) * 100;
      var r3 = (three_rating / lastPart) * 100;
      var r4 = (four_rating / lastPart) * 100;
      var r5 = (five_rating / lastPart) * 100;
      /*End*/

      var a1, a2, a3, a4, a5;
      if (averageRating == 5) {
        a5 = true;
      }
      else if (averageRating >= 4 &&  averageRating < 5) {
        a4 = true;
      }
      else if (averageRating >= 3 &&  averageRating < 4) {
        a3 = true;
      }
      else if (averageRating >= 2 &&  averageRating < 3) {
        a2 = true;
      }
      else if (averageRating >= 1 &&  averageRating < 2) {
        a1 = true;
      }

      var round1 = averageRating.toString();
      var rounded = round1.slice(0,4);

      res.render('product', {
        product: product,
        reviews: reviews,
        reviews_quick: reviews_quick.slice((reviews_quick.length - 2)).reverse(),
        shop: shop,
        ref: ref,
        averageRating: rounded,
        thres,uno,cinco,
        quatro,dos,
        a1,a2,a3,
        a4,a5,
        r1,r2,r3,r4,r5,
        products: related.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  addToCart: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const cart = new Cart(req.session.cart ? req.session.cart : {});
      const product = await Product.findById(productId);
      cart.add(product, product.id);
      req.session.cart = cart;
    //  console.log(req.session.cart);

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const cart = new Cart(req.session.cart ? req.session.cart : {});
      const product = await Product.findById(productId);
      cart.remove(product, product.id);
      req.session.cart = cart;

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  getCart: async (req, res, next) => {
    try {
      if (!req.session.cart) {
        return res.render('cart', {products: null});
      }

      var cart = new Cart(req.session.cart);

      const products = cart.generateArray();
      var product = [];
      for (var i = 0; i < products.length; i++) {
        if (products[i].qty != 0) {
          product.push(products[i])
        }
      }

      res.render('cart', {
        products: product.reverse(), 
        totalPrice: cart.totalPrice,
        actualPrice: cart.actualPrice
      })
    } catch (err) {
      next(err)
    }
  },


  getAbout: async (req, res, next) => {
    try {
      const team = await Team.find({});
      const about = await About.find({});

      var story;
      for (var i = 0; i < about.length; i++) {
        story = about[i]
      }

      res.render('about', {
        team: team,
        story: story
      })
    } catch (err) {
      next(err)
    }
  },

  getContact: async (req, res, next) => {
    try {
      const socials = await Social.find({});
      var social;
      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }
      res.render('contact', {
        social: social
      })
    } catch (err) {
      next(err)
    }
  },

  contactUs: async (req, res, next) => {
    try {
      const {name,subject,message, email} = req.body;

      const contact = new Contact({
        name: name,
        subject: subject,
        message: message,
        email: email
      });

      await contact.save();
      res.render('contact-success')
    } catch (err) {
      next(err)
    }
  },

  getWishlist: async (req, res, next) => {
    try {
      //const services = await Services.find({});
      res.render('wishlist'/*, {services: services}*/)
    } catch (err) {
      next(err)
    }
  },

  addReview: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findById(productId);
      const {fullname, review, topic, rating} = req.body;
      const date = Date.now();
      const created_at = new Date(date).toDateString();
      var image;

      if (!req.file) {
        image = "";
      }
      else{
        image = req.file.filename;
      }

      const reviews = new Review({
        fullname: fullname,
        topic: topic,
        rating: rating,
        review: review,
        image: image,
        date: created_at
      });

      await reviews.save();
      product.reviews.push(reviews);
      product.review_count++;
      await product.save();
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  }
}
