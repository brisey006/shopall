const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const About = require('../models/about');
const Contact = require('../models/contact');
const Social = require('../models/socials');
const Service = require('../models/service');
const Project = require('../models/project');
const Order = require('../models/order');
const Review = require('../models/review');
const Blog = require('../models/blog');
const Career = require('../models/career');
const Wishlist = require('../models/wishlist');
const Team = require('../models/team');
const fs = require('fs');

module.exports = {

  stockOut: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      product.stock = 0;
      await product.save();

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  stockIn: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      product.stock = 1;
      await product.save();

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  likeProject: async (req, res, next) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findById(projectId);

      project.likes++;
      await project.save();

      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      var arr = user.shop_items;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == productId) {
          arr.splice(i, 1);
          await user.save();
        }
      }

      function deleteFiles(files, callback) {
          var i = files.length;
          files.forEach((filepath) => {
            fs.unlink(filepath, function(err) {
              i--;
              if (err) {
                callback(err);
                return;
              }
              else if (i <= 0) {
                callback(null);
              }
            });
          });
        }

        var conts = product.reviews;
        var contsImages = [];
        var contsIds = [];
        for (var i = 0; i < conts.length; i++) {
          var cont = await Review.findById(conts[i]);
          contsImages.push(cont.image);
          contsIds.push(cont._id);
        }

        var merged = [].concat.apply([], contsImages);
        var mergedIds = [].concat.apply([], contsIds);
        var files = [];

        for (var i = 0; i < merged.length; i++) {
          var file = "./public/uploads/" + merged[i];
          files.push(file);
        }

        deleteFiles(files, function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Success");
          }
        });

        var productImgs = product.product_images;
        var imgFiles = [];
        for (var i = 0; i < productImgs.length; i++) {
          var file = "./public/uploads/" + productImgs[i];
          imgFiles.push(file);
        }

        deleteFiles(imgFiles, function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Success");
          }
        });

        for (var i = 0; i < mergedIds.length; i++) {
          await Review.findByIdAndDelete(mergedIds[i]);
        }

        await Product.findByIdAndDelete(productId);
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

  deleteProductAdmin: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      const userId = product.owner;
      const user = await User.findById(userId);

      var arr = user.shop_items;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == productId) {
          arr.splice(i, 1);
          await user.save();
        }
      }

      function deleteFiles(files, callback) {
          var i = files.length;
          files.forEach((filepath) => {
            fs.unlink(filepath, function(err) {
              i--;
              if (err) {
                callback(err);
                return;
              }
              else if (i <= 0) {
                callback(null);
              }
            });
          });
        }

        var conts = product.reviews;
        var contsImages = [];
        var contsIds = [];
        for (var i = 0; i < conts.length; i++) {
          var cont = await Review.findById(conts[i]);
          contsImages.push(cont.image);
          contsIds.push(cont._id);
        }

        var merged = [].concat.apply([], contsImages);
        var mergedIds = [].concat.apply([], contsIds);
        var files = [];

        for (var i = 0; i < merged.length; i++) {
          var file = "./public/uploads/" + merged[i];
          files.push(file);
        }

        deleteFiles(files, function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Success");
          }
        });

        var productImgs = product.product_images;
        var imgFiles = [];
        for (var i = 0; i < productImgs.length; i++) {
          var file = "./public/uploads/" + productImgs[i];
          imgFiles.push(file);
        }

        deleteFiles(imgFiles, function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Success");
          }
        });

        for (var i = 0; i < mergedIds.length; i++) {
          await Review.findByIdAndDelete(mergedIds[i]);
        }

        await Product.findByIdAndDelete(productId);
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  },

   deleteService: async (req, res, next) => {
     try {
       const serviceId = req.params.id;
       const service = await Service.findById(serviceId);

        const imgpath = "./public/uploads/" + service.image;
        fs.unlinkSync(imgpath);

        await Service.findByIdAndDelete(serviceId);

       res.redirect('back')
     } catch (err) {
       next(err)
     }
   },

   deleteProject: async (req, res, next) => {
     try {
       const projectId = req.params.id;
       const project = await Project.findById(projectId);

       const serviceId = project.serviceId;
       const service = await Service.findById(serviceId);

       var arr = service.works;

       for (var i = 0; i < arr.length; i++) {
         if (arr[i] == projectId) {
           arr.splice(i, 1);
           await service.save();
         }
       }


        const imgpath = "./public/uploads/" + project.image;
        fs.unlinkSync(imgpath);

        await Project.findByIdAndDelete(projectId);

       res.redirect('back')
     } catch (err) {
       next(err)
     }
   },

   deleteTeam: async (req, res, next) => {
     try {
       const teamId = req.params.id;
       const team = await Team.findById(teamId);

        const imgpath = "./public/uploads/" + team.image;
        fs.unlinkSync(imgpath);

        await Team.findByIdAndDelete(teamId);

       res.redirect('back')
     } catch (err) {
       next(err)
     }
   },

   deleteBlog: async (req, res, next) => {
     try {
       const blogId = req.params.id;
       const blog = await Blog.findById(blogId);

        const imgpath = "./public/uploads/" + blog.image;
        fs.unlinkSync(imgpath);

        await Blog.findByIdAndDelete(blogId);

       res.redirect('back')
     } catch (err) {
       next(err)
     }
   },

   deleteCareer: async (req, res, next) => {
     try {
       const careerId = req.params.id;
       const career = await Career.findById(careerId);

       await Career.findByIdAndDelete(careerId);

       res.redirect('back')
     } catch (err) {
       next(err)
     }
   },

   deleteWishlist: async (req, res, next) => {
     try {
       const wishlistId = req.params.id;
       const wishlist = await Wishlist.findById(wishlistId);

       const userId = req.session.passport.user;
       const user = await User.findById(userId);

       var arr = user.wishlist;

       for (var i = 0; i < arr.length; i++) {
         if (arr[i] == wishlistId) {
           arr.splice(i, 1);
           await user.save();
         }
       }

       await Wishlist.findByIdAndDelete(wishlistId);

       res.redirect('back')
     } catch (err) {
       next(err)
     }
   },

   getEditProduct: async (req, res, next) => {
     try {
       const productId = req.params.id;
       const product = await Product.findById(productId);

       const userId = req.session.passport.user;
       const user = await User.findById(userId);

       res.render('user-shop-edit-product', {
         profile: user,
         product: product
       });
     } catch (err) {
       next(err)
     }
   },

   editProduct: async (req, res, next) => {
     try {
       const productId = req.params.id;
       const product = await Product.findById(productId);

       const {features,specs,shipping, discount, price,category,name,condition, price_cut, description, product_video} = req.body;

       if (features != "") {
         product.features = features.split('#');
       }

       if (specs != "") {
         product.specs = req.body.specs.split('#');
       }

       if (shipping != "") {
         product.shipping = req.body.shipping.split('#');
       }

       product.discount = discount;
       product.price = price;

       if (category != "") {
         product.category = category;
       }

       product.name = name;

       if (condition != "") {
         product.condition = condition;
       }
       product.currency = "$";
       product.price_cut = price_cut;
       product.description = description;
       product.product_video = product_video;

       await product.save();

       res.redirect('/user/profile-shop')
     } catch (err) {
       next(err)
     }
   },

}
