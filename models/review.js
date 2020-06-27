const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  topic:String,
  rating: Number,
  fullname: String,
  image: String,
  review: {
    type: String
  },
  date: String,
  one: Number,
  two : Number,
  three: Number,
  four: Number,
  five: Number
  });

module.exports = mongoose.model('Reviews', schema);
