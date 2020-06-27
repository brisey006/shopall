const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name:String,
  stock: String,
  image: String,
  price: {
    type: Number
  },
  currency: String,
  product: String,
  price_cut: Number
  });

module.exports = mongoose.model('Wishlist', schema);
