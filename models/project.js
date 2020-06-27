const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name:String,
  service: String,
  serviceId: String,
  image: String,
  website: String,
  description: String,
  tools_and_tech: String,
  likes: Number,
  playstore: String,
  appstore: String
  });

module.exports = mongoose.model('Project', schema);
