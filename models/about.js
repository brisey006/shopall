const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  description: String
  });

module.exports = mongoose.model('About', schema);
