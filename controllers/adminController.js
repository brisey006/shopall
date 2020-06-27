const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const Contact = require('../models/contact');
const Social = require('../models/socials');
const Subscription = require('../models/subs');
const Service = require('../models/service');
const Project = require('../models/project');
const Order = require('../models/order');
const Review = require('../models/review');
const Blog = require('../models/blog');
const Career = require('../models/career');
const Password = require('../models/password');
const About = require('../models/about');
const Team = require('../models/team');

module.exports = {
  getAdminSuper: async (req, res, next) => {
    try {
      const users = await User.find({});
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      res.render('admin', {
        users: users.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

  getAdminPasswords: async (req, res, next) => {
    try {
      const users = await Password.find({});
      const userId = req.session.passport.user;
      const user = await User.findById(userId);

      res.render('admin-passwords', {
        users: users.reverse()
      })
    } catch (err) {
      next(err)
    }
  },

getAdmin: async (req, res, next) => {
  try {
    const users = await User.find({});
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    res.render('admin-users', {
      users: users.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminShops: async (req, res, next) => {
  try {
    const users = await User.find({});
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    var shops = [];
    for (var i = 0; i < users.length; i++) {
      if (users[i].is_shop) {
        shops.push(users[i]);
      }
    }

    res.render('admin-shops', {
      users: users.reverse(),
      shops: shops.length
    })
  } catch (err) {
    next(err)
  }
},

getAdminProducts: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const products = await Product.find({});

    res.render('admin-products', {
      user: user,
      products: products.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminTopDeals: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const products = await Product.find({});
    var deals = [];
    for (var i = 0; i < products.length; i++) {
      if (products[i].is_deal) {
        deals.push(products[i]);
      }
    }


    res.render('admin-top-deals', {
      user: user,
      deals: deals.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminBlogs: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const blogs = await Blog.find({});

    res.render('admin-blogs', {
      user: user,
      blogs: blogs.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminServices: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const services = await Service.find({});

    res.render('admin-services', {
      user: user,
      services: services.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminServiceProjects: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);

    var serviceProjects = [];
    var projects = service.works;
     for (var i = 0; i < projects.length; i++) {
       const project = await Project.findById(projects[i]);
       serviceProjects.push(project);
     }

    res.render('admin-service-project', {
      user: user,
      service: service.title,
      projects: serviceProjects.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminCareers: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const careers = await Career.find({});

    res.render('admin-careers', {
      user: user,
      careers: careers.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminTeam: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const team = await Team.find({});

    res.render('admin-team', {
      user: user,
      team: team.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminSocials: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    res.render('admin-socials', {
      user: user
    })
  } catch (err) {
    next(err)
  }
},

getAdminCustomerCare: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    const contact = await Contact.find({});

    res.render('admin-contact', {
      user: user,
      contact: contact.reverse()
    })
  } catch (err) {
    next(err)
  }
},

getAdminSubs: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    const subs = await Subscription.find({});

    res.render('admin-subs', {
      user: user,
      subs: subs.reverse()
    })
  } catch (err) {
    next(err)
  }
},


/*Uploads Controls*/
getProductUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    res.render('admin-product-upload', {profile: user});
  } catch (err) {
    next(err)
  }
},

uploadShopProduct: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);
     const {discount,condition, price,category,name, currency, price_cut, description, product_video} = req.body;

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
       is_shopall: 1,
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

     res.redirect('/shopall/control/admin-products')
  } catch (err) {
    next(err)
  }
},

getDealUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    res.render('admin-deal-upload', {profile: user});
  } catch (err) {
    next(err)
  }
},

uploadDeal: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);
     const {discount,condition, price,category,name, currency, price_cut, description, product_video, countdown} = req.body;

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
       is_shopall: 1,
       is_deal: 1,
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
       review_count: review_count,
       countdown: countdown
     });

     product.reviews;
     await product.save();
     user.shop_items.push(product);
     await user.save();

     res.redirect('/shopall/control/upload-deal')
  } catch (err) {
    next(err)
  }
},

getBlogUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    res.render('admin-blog-upload', {profile: user});
  } catch (err) {
    next(err)
  }
},

uploadBlog: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);

     const {title,description, video} = req.body;

    const date = Date.now();
    const created_at = new Date(date).toDateString();

     const images = [];
     var photos = req.files;

     for (var i = 0; i < photos.length; i++) {
       images.push(photos[i].filename);
     }

     const blog = new Blog({
       title: title,
       description: description,
       video: video,
       date: created_at,
       image: req.files[0].filename,
       images: images
     });

     await blog.save();

     res.redirect('/shopall/control/admin-blogs')
  } catch (err) {
    next(err)
  }
},

getServiceUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    res.render('admin-service-upload', {profile: user});
  } catch (err) {
    next(err)
  }
},

uploadService: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);

     const {title, description,website, address, facebook, twitter, instagram,linkedin, email, phone} = req.body;


     const service = new Service({
       title: title,
       description: description,
       website: website,
       address: address,
       facebook: facebook,
       twitter: twitter,
       instagram: instagram,
       linkedin: linkedin,
       email: email,
       phone: phone,
       image: req.file.filename
     });

     await service.save();

     res.redirect('/shopall/control/admin-services')
  } catch (err) {
    next(err)
  }
},

getServiceProjectUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const serviceId = req.params.id;

    res.render('admin-service-project-upload', {profile: user, serviceId});
  } catch (err) {
    next(err)
  }
},

uploadServiceProject: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);

     const serviceId = req.params.id;
     const services = await Service.findById(serviceId);

     const {name, description,website, appstore, service, playstore, tools_and_tech} = req.body;

     const project = new Project({
       name: name,
       description: description,
       website: website,
       service: service,
       serviceId: serviceId,
       appstore: appstore,
       playstore: playstore,
       tools_and_tech: tools_and_tech,
       likes: 0,
       image: req.file.filename
     });

     await project.save();
     services.works.push(project);
     await services.save();

     res.redirect('back')
  } catch (err) {
    next(err)
  }
},

getCareerUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    res.render('admin-career-upload', {profile: user});
  } catch (err) {
    next(err)
  }
},

uploadCareer: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);
     const {title, description,address,email, phone} = req.body;

     const date = Date.now();
     const created_at = new Date(date).toDateString();

     var requirements = req.body.requirements.split('#');

     const career = new Career({
       title: title,
       description: description,
       address: address,
       requirements: requirements,
       email: email,
       phone: phone,
       date: created_at
     });

     await career.save();

     res.redirect('/shopall/control/upload-career')
  } catch (err) {
    next(err)
  }
},

getTeamUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    res.render('admin-team-upload', {profile: user});
  } catch (err) {
    next(err)
  }
},

uploadTeam: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);

     const {title, name,email,phone, facebook, instagram, twitter, linkedin} = req.body;

     const team = new Team({
       title: title,
       name: name,
       facebook: facebook,
       instagram: instagram,
       email: email,
       phone: phone,
       linkedin: linkedin,
       image: req.file.filename,
       twitter: twitter
     });

     await team.save();

     res.redirect('/shopall/control/admin-team')
  } catch (err) {
    next(err)
  }
},

getAboutUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    const about = await About.find({});

    var story;
    for (var i = 0; i < about.length; i++) {
      story = about[i]
    }

    res.render('admin-about-upload', {
      profile: user,
      story: story
    });
  } catch (err) {
    next(err)
  }
},

uploadAbout: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);
     const {description} = req.body;

     const about = new About({
       description: description
     });

     await about.save();

     res.redirect('back')
  } catch (err) {
    next(err)
  }
},

updateAbout: async (req, res, next) => {
  try {
     const userId = req.session.passport.user;
     const user = await User.findById(userId);
     const {description} = req.body;

     const about = await About.find({});

     var story;
     for (var i = 0; i < about.length; i++) {
       story = about[i]
     }

     story.description = description;

     await story.save();

     res.redirect('back')
  } catch (err) {
    next(err)
  }
},

getSocialsUpload: async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

      const socials = await Social.find({});
      var social;
      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

    res.render('admin-socials-upload', {profile: user, social: social});
  } catch (err) {
    next(err)
  }
},


  uploadSocials: async (req, res, next) => {
    try {
      const {facebook, twitter, linkedin, instagram, email,map, youtube, hq} = req.body;
      var cells = req.body.cells.split('#');

      const socials = new Social({
        facebook: facebook,
        twitter: twitter,
        linkedin: linkedin,
        instagram: instagram,
        email: email,
        youtube: youtube,
        hq: hq,
        map: map,
        cells: cells
      });

      await socials.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },

  updateSocials: async (req, res, next) => {
    try {
      const {facebook, twitter, linkedin, instagram, email,map, youtube,hq} = req.body;
      var cells = req.body.cells.split('#');
      const socials = await Social.find({});
      var social;

      for (var i = 0; i < socials.length; i++) {
        social = socials[i]
      }

        social.facebook = facebook;
        social.twitter = twitter;
        social.linkedin = linkedin;
        social.instagram = instagram;
        social.email = email;
        social.youtube = youtube;
        social.hq = hq;
        social.map = map;
        social.cells = cells;


      await social.save();
      res.redirect('back');
    } catch (err) {
      next(err)
    }
  },



/*End Uploads Controls*/

registerShop: async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    user.is_shop = 1;

    user.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

unRegisterShop: async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    user.is_shop = 0;

    user.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

activateShop: async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    user.active = 1;

    user.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

deActivateShop: async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    user.active = 0;

    user.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

/*Admin Controls*/
makeAdmin: async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    user.is_admin = 1;

    user.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

removeAdmin: async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    user.is_admin = 0;

    user.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

makeShopall: async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    product.is_shopall = 1;

    product.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

recommendProduct: async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    product.is_recom = 1;

    product.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

bestRateProduct: async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    product.is_rated = 1;

    product.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},

makeTopProduct: async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    product.is_top = 1;

    product.save();
    res.redirect('back')
  } catch (err) {
    next(err)
  }
},


/*End*/

}
