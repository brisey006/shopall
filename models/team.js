const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title:String,
  name: String,
  phone: Array,
  facebook: String,
  email: String,
  instagram: String,
  twitter: String,
  image: String,
  linkedin: String
  });

module.exports = mongoose.model('Team', schema);
