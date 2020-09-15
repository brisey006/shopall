const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  fullname: String,
  profile_image: String,
  shopname: String,
  shopType: String,
  is_shop: Number,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
  date: String,
  active: Number,
  country: String,
  address: String,
  city:String,
  zipcode: String,
  cell:String,
  visa_card: String,
  master_card: String,
  paypal: String,
  ecocash: String,
  onemoney: String,
  sub: Number,
  is_admin: Number,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'orders'
    }
  ],
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'wishlist'
    }
  ],
  shop_items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'shop_items'
    }
  ],
  ledger: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ledger'
    }
  ],
  shop_orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'shop_orders'
    }
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(candidatePassword) {
    if(this.password != null) {
        return bcrypt.compareSync(candidatePassword, this.password);
    } else {
        return false;
    }
};

module.exports = mongoose.model('User', userSchema);
