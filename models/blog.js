const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title:String,
  description: String,
  image: String,
  images: Array,
  video: String,
  date: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
  });

module.exports = mongoose.model('Blog', schema);
