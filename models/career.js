const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title:String,
  description: String,
  requirements: Array,
  address: String,
  email: String,
  phone: String,
  date: String
  });

module.exports = mongoose.model('Career', schema);
