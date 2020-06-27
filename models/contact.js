const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name:String,
  message: String,
  subject: String,
  email: String
  });

module.exports = mongoose.model('Contact', schema);
