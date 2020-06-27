const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  product_image: {
    type: String
  },
  is_shopall: Number,
  is_deal: Number,
  is_top: Number,
  is_rated: Number,
  is_recom: Number,
  product_images: Array,
  product_video: String,
  currency: {
    type: String
  },
  price: {
    type: Number
  },
  price_cut: {
    type: Number
  },
  discount: Number,
  stock: {
    type: Number
  },
  condition: {
    type: String
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  review_count: Number,
  category: String,
  specs: Array,
  features: Array,
  shipping: Array,
  owner: {
    type: String,
    ref: 'owner'
  },
  countdown: String
});

module.exports = mongoose.model('Product', schema);
