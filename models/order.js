const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  price:Number,
  product_id: String,
  currency: String,
  order_number: String,
  canceled: Number,
  delivered: Number,
  in_progress: Number,
  date: String,
  name: String,
  paymentId: String,
  address: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  });

module.exports = mongoose.model('Orders', schema);
