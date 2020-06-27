const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title:String,
  description: String,
  image: String,
  works: [
    {
      type: Schema.Types.ObjectId,
      ref: 'orders'
    }
  ],
  website: String,
  address: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
  email: String,
  phone: String
  });

module.exports = mongoose.model('Service', schema);
