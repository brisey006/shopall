const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String
  },
  date: {
    type: String
  },
  phone: String,
  email: String,
  show: String,
  price: String,
  pollUrl: String
  });

module.exports = mongoose.model('PaynowStatus', schema);
