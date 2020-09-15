const express = require('express');
const Career = require('../models/career');
const Product = require('../models/product');
const User = require('../models/user');
const About = require('../models/about');
const Contact = require('../models/contact');
const Service = require('../models/service');
const Project = require('../models/project');
const Order = require('../models/order');
const Review = require('../models/review');
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const Subscription = require('../models/subs');

module.exports = {
  getTopDeals: async (req, res, next) => {
    try {
      const products = await Product.find({});
      var deals = [];
      var date;
      for (var i = 0; i < products.length; i++) {
        if (products[i].is_deal) {
          var today = new Date().toDateString();
          var dealdate = new Date(products[i].countdown).toDateString();

          //console.log(today + " <=> " + dealdate + " " + products[i].name);
          if (dealdate === today) {
            products[i].countdown = null;
            await products[i].save();
          }

          if (products[i].countdown) {
            deals.push(products[i]);
          }

        }
      }


      res.render('deals', {
        deals: deals.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  getServices: async (req, res, next) => {
    try {
      const services = await Service.find({});
      res.render('services', {
        services: services.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  getAdverts: async (req, res, next) => {
    try {
      res.render('advert')
    } catch (err) {
      next(err)
    }
  },

  getService: async (req, res, next) => {
    try {
      const serviceId = req.params.id;
      const service = await Service.findById(serviceId);

      if (!service) {
        return res.redirect("/shopall/services");
      }

      var serviceProjects = [];

      var projects = service.works;
      for (var i = 0; i < projects.length; i++) {
        const project = await Project.findById(projects[i]);
        serviceProjects.push(project);
      }

      res.render('services-single', {
        service: service,
        projects: serviceProjects.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  getProject: async (req, res, next) => {
    try {
      const projectId = req.params.id;
      const project = await Project.findById(projectId);

      if (!project) {
        return res.redirect("/shopall/services");
      }

      res.render('work', {
        project: project
      })
    } catch (err) {
      next(err)
    }
  },

  getCareers: async (req, res, next) => {
    try {
      const careers = await Career.find({});
      res.render('careers', {
        careers: careers.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  getTerms: async (req, res, next) => {
    try {
      const products = await Product.find({});
      res.render('terms_and_conditions', {
        products: products
      })
    } catch (err) {
      next(err)
    }
  },

  getBlogs: async (req, res, next) => {
    try {
      const blogs = await Blog.find({});

      res.render('blogs', {
        blogs: blogs.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  getBlog: async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.redirect("/blogs");
      }

      const ids = blog.comments;
      const comments = [];
      for (var i = 0; i < ids.length; i++) {
        const comment = await Comment.findById(ids[i]);
        comments.push(comment);
      }

      res.render('blog-single', {
        blog: blog,
        comments: comments
      })
    } catch (err) {
      next(err)
    }
  },

  get404: async (req, res, next) => {
    try {
      res.render('404')
    } catch (err) {
      next(err)
    }
  },

  getSearch: async (req, res, next) => {
    try {
      const products = await Product.find({});

      res.render('search-results', {
        products: products
      })
    } catch (err) {
      next(err)
    }
  },

  searchProducts: async (req, res, next) => {
    try {
      const products = await Product.find({});
      const services = await Service.find({});
      const users = await User.find({});
      const blogs = await Blog.find({});

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

      var shops = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].is_shop) {
          if (users[i].active) {
            shops.push(users[i]);
          }
        }
      }

      var servicesblogsFound = [];

      for (var i = 0; i < shops.length; i++) {
        if (shops[i].fullname.toLowerCase().includes(search.toLowerCase())) {
          servicesblogsFound.push(shops[i]);
        } else if (shops[i].shopname) {
          if (shops[i].shopname.toLowerCase().includes(search.toLowerCase())) {
            servicesblogsFound.push(shops[i]);
          }
        }
        if (shops[i].shopType) {
          if (shops[i].shopType.toLowerCase().includes(search.toLowerCase())) {
            servicesblogsFound.push(shops[i]);
          }
        }
      }


      for (var i = 0; i < services.length; i++) {
        if (services[i].title.toLowerCase().includes(search.toLowerCase())) {
          servicesblogsFound.push(services[i]);
        }
        if (services[i].description.toLowerCase().includes(search.toLowerCase())) {
          servicesblogsFound.push(services[i]);
        }
      }

      for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].title.toLowerCase().includes(search.toLowerCase())) {
          servicesblogsFound.push(blogs[i]);
        }
        if (blogs[i].description.toLowerCase().includes(search.toLowerCase())) {
          servicesblogsFound.push(blogs[i]);
        }
      }

      res.render('search-results', {
        search: search,
        products: productsFound,
        servicesblogsFound: servicesblogsFound
      })
    } catch (err) {
      next(err)
    }
  },

  getShopsSearch: async (req, res, next) => {
    try {
      const shops = await User.find({});

      res.render('shops-search', {
        shops: shops.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  searchShops: async (req, res, next) => {
    try {
      const users = await User.find({});
      const search = req.body.searchShops;

      var shops = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].is_shop) {
          if (users[i].active) {
            shops.push(users[i]);
          }
        }
      }

      var shopsFound = [];

      for (var i = 0; i < shops.length; i++) {
        if (shops[i].fullname.toLowerCase().includes(search.toLowerCase())) {
          shopsFound.push(shops[i]);
        } else if (shops[i].shopname) {
          if (shops[i].shopname.toLowerCase().includes(search.toLowerCase())) {
            shopsFound.push(shops[i]);
          }
        }
        if (shops[i].shopType) {
          if (shops[i].shopType.toLowerCase().includes(search.toLowerCase())) {
            shopsFound.push(shops[i]);
          }
        }
      }

      res.render('shops-search', {
        search: search,
        shops: shopsFound
      })
    } catch (err) {
      next(err)
    }
  },

  searchServices: async (req, res, next) => {
    try {
      const services = await Service.find({});
      const search = req.body.search;

      var servicesFound = [];

      for (var i = 0; i < services.length; i++) {
        if (services[i].title.toLowerCase().includes(search.toLowerCase())) {
          servicesFound.push(services[i]);
        }

        if (services[i].description.toLowerCase().includes(search.toLowerCase())) {
          servicesFound.push(services[i]);
        }
      }

      res.render('services', {
        search: search,
        services: servicesFound
      })
    } catch (err) {
      next(err)
    }
  },

  searchBlogs: async (req, res, next) => {
    try {
      const blogs = await Blog.find({});
      const search = req.body.search;

      var blogsFound = [];

      for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].title.toLowerCase().includes(search.toLowerCase())) {
          blogsFound.push(blogs[i]);
        }

        if (blogs[i].description.toLowerCase().includes(search.toLowerCase())) {
          blogsFound.push(blogs[i]);
        }

      }

      res.render('blogs', {
        search: search,
        blogs: blogsFound
      })
    } catch (err) {
      next(err)
    }
  },

  addComment: async (req, res, next) => {
    try {
      const blogId = req.params.id
      const blog = await Blog.findById(blogId);
      const {fullname,comment} = req.body;
      const date = Date.now();
      const created_at = new Date(date).toDateString();
      var image;

      if (!req.file) {
        image = "";
      } else {
        image = req.file.filename;
      }

      const comments = new Comment({
        fullname: fullname,
        comment: comment,
        image: image,
        date: created_at
      });

      await comments.save();
      blog.comments.push(comments);
      await blog.save();
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },



}
