const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  stripe_account_id: {},
  stripe_seller: {
    type: Object,
    default: {},
  },
  stripeSession: {
    type: Object,
    default: {},
  },

}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 12, function (err, hash) {
    if (err) {
      console.error("BCRYPT HASH ERROR:", err);
      return next(err); 
    }

    user.password = hash;
    next();
  });
});


userSchema.methods.comparePassword = function (password, next){
  bcrypt.compare(password, this.password, function(err, match){
    if(err){
      console.log("Comapre password err", err);
      return next(err, false);
    }
    console.log("match password", match);
    return next(null, match);
  })
}

const User = mongoose.model("User", userSchema);
module.exports = User;
