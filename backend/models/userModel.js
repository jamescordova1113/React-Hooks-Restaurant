const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ROLES = require('../constants/role');
const config = require('../config');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  }
});

UserSchema.method.generateAuthToken = function generateAuthToken() {
  const token = jwt.sign({_id: this._id, role: this.role}, config.jwtSecret, { expriesIn: config.jwtExpires });
  return token;
}

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.isPasswordValid = async function(password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
    next();
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

exports.user = User;