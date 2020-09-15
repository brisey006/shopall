const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  price:Number,
  currency: String,
  order_number: String,
  canceled: Number,
  delivered: Number,
  shop_delivered: Number,
  admin_delivered: Number,
  in_progress: Number,
  quantity: Number,
  date: String,
  name: String,
  nationalID: String,
  country: String,
  city: String,
  hnumber: String,
  bank: String,
  phone: String,
  card_type: String,
  delivery_type: String,
  delivery_period: String,
  other_form: String,
  other_type: String,
  gateway_type: String,
  mobile_type: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  });

module.exports = mongoose.model('Orders', schema);
