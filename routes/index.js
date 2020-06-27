const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../upload');
const Cart = require('../models/cart');
const Product = require('../models/product');
const ShopController = require('../controllers/shopController');
const CategoryController = require('../controllers/categoryController');
const UserController = require('../controllers/userController');
const ExtraController = require('../controllers/extrasController');
const CheckoutController = require('../controllers/checkoutController');
const AdminController = require('../controllers/adminController');
const Controller = require('../controllers/controllers');

router.route('/')
  .get(ShopController.index)

router.route('/search-results')
  .get(ExtraController.getSearch)
  .post(ExtraController.searchProducts)

router.route('/search-shops')
  .get(ExtraController.getShopsSearch)
  .post(ExtraController.searchShops)

router.route("/profile-upload-product")
  .get(isLoggedIn,UserController.getProfileUpload)
  .post(upload.array('images'), UserController.uploadProduct)

router.route('/shops')
  .get(ShopController.getShops)

router.route('/categories')
  .get(ShopController.getCatagories)


/*Shop Product*/
router.route('/shop/:id')
  .get(ShopController.getShop)

router.route('/search-shop/:id')
  .post(ShopController.searchShop)

router.route('/product/:id')
  .get(ShopController.getProduct)
  .post(upload.single('image'),ShopController.addReview)

router.route('/edit-product/:id')
  .get(isLoggedIn,Controller.getEditProduct)
  .post(isLoggedIn,Controller.editProduct)

router.route('/remove-wishlist/:id')
  .get(isLoggedIn,Controller.deleteWishlist)

router.route('/add-to-cart/:id')
  .get(ShopController.addToCart)

router.route('/add-to-wishlist/:id')
  .get(isLoggedIn, UserController.addToWishlist)

router.route('/add-to-orders/:id')
  .get(isLoggedIn, UserController.addToOrders)

router.route('/cancel/:id')
  .get(isLoggedIn, UserController.cancelOrder)

router.route('/deliver/:id')
  .get(isLoggedIn, UserController.deliverOrder)

router.route('/in_progress/:id')
  .get(isLoggedIn, UserController.activeOrder)

router.route('/remove-from-cart/:id')
  .get(ShopController.removeFromCart)

router.route('/cart')
  .get(ShopController.getCart)

/*End Shop Product*/

/*Shop Owner Controllers*/
router.route('/stock_out/:id')
  .get(isLoggedIn, Controller.stockOut)

router.route('/stock_in/:id')
  .get(isLoggedIn, Controller.stockIn)

router.route('/like-project/:id')
  .get(isLoggedIn, Controller.likeProject)

router.route('/delete_product/:id')
  .get(isLoggedIn, Controller.deleteProduct)

router.route('/delete-product/:id')
  .get(isLoggedIn, Controller.deleteProductAdmin)

router.route('/delete-career/:id')
  .get(isLoggedIn, Controller.deleteCareer)

router.route('/delete-blog/:id')
  .get(isLoggedIn, Controller.deleteBlog)

router.route('/delete-team/:id')
  .get(isLoggedIn, Controller.deleteTeam)

router.route('/delete-service/:id')
  .get(isLoggedIn, Controller.deleteService)

router.route('/delete-project/:id')
  .get(isLoggedIn, Controller.deleteProject)
/*End Controllers*/

/*Shop Checkout */
router.route('/checkout-card/:id')
  .get(isLoggedIn,CheckoutController.getCheckoutCard)

router.route('/checkout-onemoney/:id')
  .get(isLoggedIn,CheckoutController.getCheckoutOneMoney)

router.route('/checkout-ecocash/:id')
  .get(isLoggedIn,CheckoutController.getCheckoutEcocash)

router.route('/checkout-other/:id')
  .get(isLoggedIn,CheckoutController.getCheckoutOther)

/*End Checkout*/

/*Extras */
router.route('/shopall/top_deals')
  .get(ExtraController.getTopDeals)

router.route('/shopall/services')
  .get(ExtraController.getServices)

router.route('/search-services')
  .post(ExtraController.searchServices)

router.route('/service/:id')
  .get(ExtraController.getService)

router.route('/project/:id')
  .get(ExtraController.getProject)

router.route('/shopall/careers')
  .get(ExtraController.getCareers)

router.route('/shopall/advertising')
  .get(ExtraController.getAdverts)

router.route('/page-not-found')
  .get(ExtraController.get404)

router.route('/form/subscription')
  .post(ExtraController.addSub)

router.route('/terms_and_conditions')
  .get(ExtraController.getTerms)

router.route('/blogs')
  .get(ExtraController.getBlogs)

router.route('/search-blogs')
  .post(ExtraController.searchBlogs)

router.route('/blog/:id')
  .get(ExtraController.getBlog)
  .post(upload.single('image'),ExtraController.addComment)

router.route('/about')
  .get(ShopController.getAbout)

router.route('/contact')
  .get(ShopController.getContact)
  .post(ShopController.contactUs)

/*End Extras*/

/*Admin Dashboard*/
router.route('/shopall/control/admin-super')
  .get(isLoggedIn,AdminController.getAdminSuper)

router.route('/shopall/control/shopall-admin-password-recovery')
  .get(isLoggedIn,AdminController.getAdminPasswords)

router.route('/shopall/control/admin-dashboard')
  .get(isLoggedIn,AdminController.getAdmin)

router.route('/shopall/control/admin-shops')
  .get(isLoggedIn,AdminController.getAdminShops)

router.route('/shopall/control/admin-products')
  .get(isLoggedIn,AdminController.getAdminProducts)

router.route('/shopall/control/admin-top_deals')
  .get(isLoggedIn,AdminController.getAdminTopDeals)

router.route('/shopall/control/admin-blogs')
  .get(isLoggedIn,AdminController.getAdminBlogs)

router.route('/shopall/control/admin-services')
  .get(isLoggedIn,AdminController.getAdminServices)

router.route('/service-projects/:id')
  .get(isLoggedIn,AdminController.getAdminServiceProjects)

router.route('/shopall/control/admin-careers')
.get(isLoggedIn,AdminController.getAdminCareers)

router.route('/shopall/control/admin-socials')
  .get(isLoggedIn,AdminController.getAdminSocials)

router.route('/shopall/control/admin-team')
  .get(isLoggedIn,AdminController.getAdminTeam)

router.route('/shopall/control/admin-customer_care')
  .get(isLoggedIn,AdminController.getAdminCustomerCare)

router.route('/shopall/control/admin-subscribers')
  .get(isLoggedIn,AdminController.getAdminSubs)

router.route('/register_shop/:id')
  .get(isLoggedIn,AdminController.registerShop)

router.route('/unregister_shop/:id')
  .get(isLoggedIn,AdminController.unRegisterShop)

router.route('/activate_account/:id')
  .get(isLoggedIn,AdminController.activateShop)

router.route('/deactivate_account/:id')
  .get(isLoggedIn,AdminController.deActivateShop)

router.route('/add-admin/:id')
  .get(isLoggedIn,AdminController.makeAdmin)

router.route('/remove-admin/:id')
  .get(isLoggedIn,AdminController.removeAdmin)

router.route('/make-product-shopall/:id')
  .get(isLoggedIn,AdminController.makeShopall)

router.route('/make-top-seller/:id')
  .get(isLoggedIn,AdminController.makeTopProduct)

router.route('/make-best-rated/:id')
  .get(isLoggedIn,AdminController.bestRateProduct)

router.route('/recommend-product/:id')
  .get(isLoggedIn,AdminController.recommendProduct)
/*End Admin*/

/*Admin Uploads*/
router.route('/shopall/control/upload-product')
  .get(isLoggedIn,AdminController.getProductUpload)
  .post(upload.array('images'), AdminController.uploadShopProduct)

router.route('/shopall/control/upload-deal')
  .get(isLoggedIn,AdminController.getDealUpload)
  .post(upload.array('images'), AdminController.uploadDeal)

router.route('/shopall/control/upload-blog')
  .get(isLoggedIn,AdminController.getBlogUpload)
  .post(upload.array('images'), AdminController.uploadBlog)

router.route('/shopall/control/upload-service')
  .get(isLoggedIn,AdminController.getServiceUpload)
  .post(upload.single('image'), AdminController.uploadService)

router.route('/upload-service-project/:id')
  .get(isLoggedIn,AdminController.getServiceProjectUpload)
  .post(upload.single('image'), AdminController.uploadServiceProject)

router.route('/shopall/control/upload-career')
  .get(isLoggedIn,AdminController.getCareerUpload)
  .post(upload.single('image'), AdminController.uploadCareer)

router.route('/shopall/control/upload-team')
  .get(isLoggedIn,AdminController.getTeamUpload)
  .post(upload.single('image'),AdminController.uploadTeam)

router.route('/shopall/control/upload-about')
  .get(isLoggedIn,AdminController.getAboutUpload)
  .post(upload.array('image'),AdminController.uploadAbout)

router.route('/shopall/control/update-about')
  .get(isLoggedIn,AdminController.getAboutUpload)
  .post(upload.array('image'),AdminController.updateAbout)

router.route('/shopall/control/upload-socials')
  .get(isLoggedIn,AdminController.getSocialsUpload)
  .post(AdminController.uploadSocials)

router.route('/shopall/control/update-socials')
  .get(isLoggedIn,AdminController.getSocialsUpload)
  .post(AdminController.updateSocials)
/*End Admin Uploads*/

/*Profile Settings*/
router.route("/update-image")
  .get(isLoggedIn,UserController.getEditProfileImage)
  .post(upload.single('image'),UserController.editProfileImage)

router.route("/update/profile")
  .post(isLoggedIn, UserController.editProfile)

/*End Settings*/

/*Category Controller*/

router.route('/categories/women_clothing')
  .get(CategoryController.getC1)
  .post(CategoryController.c1Search)

router.route('/categories/men_clothing')
  .get(CategoryController.getC2)
  .post(CategoryController.c2Search)

router.route('/categories/boys_clothing')
  .get(CategoryController.getC3)
  .post(CategoryController.c3Search)

router.route('/categories/girls_clothing')
  .get(CategoryController.getC4)
  .post(CategoryController.c4Search)

router.route('/categories/computers_and_accessories')
  .get(CategoryController.getC5)
  .post(CategoryController.c5Search)

router.route('/categories/food_and_groceries')
  .get(CategoryController.getC6)
  .post(CategoryController.c6Search)

router.route('/categories/tv_audio_video')
  .get(CategoryController.getC7)
  .post(CategoryController.c7Search)

router.route('/categories/smartphones_and_tablets')
  .get(CategoryController.getC8)
  .post(CategoryController.c8Search)

router.route('/categories/cameras_photo_video')
  .get(CategoryController.getC9)
  .post(CategoryController.c9Search)

router.route('/categories/headphones')
  .get(CategoryController.getC10)
  .post(CategoryController.c10Search)

router.route('/categories/electronics')
  .get(CategoryController.getC11)
  .post(CategoryController.c11Search)

router.route('/categories/video_games')
  .get(CategoryController.getC12)
  .post(CategoryController.c12Search)

router.route('/categories/toys_and_games')
  .get(CategoryController.getC13)
  .post(CategoryController.c13Search)

router.route('/categories/beauty_and_personal_care')
  .get(CategoryController.getC14)
  .post(CategoryController.c14Search)

router.route('/categories/books')
  .get(CategoryController.getC15)
  .post(CategoryController.c15Search)

router.route('/categories/stationary')
  .get(CategoryController.getC16)
  .post(CategoryController.c16Search)

router.route('/categories/furniture_and_homewares')
  .get(CategoryController.getC17)
  .post(CategoryController.c17Search)

router.route('/categories/industrial_and_scientific')
  .get(CategoryController.getC18)
  .post(CategoryController.c18Search)

router.route('/categories/alcohol')
  .get(CategoryController.getC19)
  .post(CategoryController.c19Search)

router.route('/categories/health_and_household')
  .get(CategoryController.getC20)
  .post(CategoryController.c20Search)

router.route('/categories/tools_and_garden')
  .get(CategoryController.getC21)
  .post(CategoryController.c21Search)

router.route('/categories/sports_and_outdoor')
  .get(CategoryController.getC22)
  .post(CategoryController.c22Search)

router.route('/categories/media_house')
  .get(CategoryController.getC23)
  .post(CategoryController.c23Search)

router.route('/categories/farming')
  .get(CategoryController.getC24)
  .post(CategoryController.c24Search)

router.route('/categories/software')
  .get(CategoryController.getC25)
  .post(CategoryController.c25Search)

router.route('/categories/bags_and_luggage')
  .get(CategoryController.getC26)
  .post(CategoryController.c26Search)

router.route('/categories/shoes')
  .get(CategoryController.getC27)
  .post(CategoryController.c27Search)

router.route('/categories/jewellery')
  .get(CategoryController.getC28)
  .post(CategoryController.c28Search)

router.route('/categories/arts_and_crafts')
  .get(CategoryController.getC29)
  .post(CategoryController.c29Search)

router.route('/categories/services')
  .get(CategoryController.getC30)
  .post(CategoryController.c30Search)

router.route('/categories/baby_products')
  .get(CategoryController.getC31)
  .post(CategoryController.c31Search)

router.route('/categories/home_and_kitchen')
  .get(CategoryController.getC32)
  .post(CategoryController.c32Search)

router.route('/categories/other')
  .get(CategoryController.getC33)
  .post(CategoryController.c33Search)

/*Category Controller */

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/signin')
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/profile')
}
