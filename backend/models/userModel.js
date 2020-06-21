const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ROLES = require('../constants/role');
const config = require('../config');
const bcrypt = require('bcrypt');
const Joi = require('joi');

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
    maxlength: 50,
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER
  }
});

UserSchema.methods.generateAuthToken = function generateAuthToken() {
  const token = jwt.sign({_id: this._id, role: this.role}, config.jwtSecret, { expriesIn: config.jwtExpires });
  return token;
}

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.isPasswordValid = function isPasswordValid(password) {
  return bcrypt.compareSync(password, this.password);
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

const validateUser = (user) => {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required().email(),
    password: Joi.string().min(3).max(50).required(),
    role: Joi.string().min(3).max(10).required().default(ROLES.USER)
  };

  return Joi.validate(user, schema);
}

const validateUpdateUser = (user) => {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required().email(),
    password: Joi.string().min(3).max(50).required(),
    role: Joi.string().min(3).max(10).required().default(ROLES.USER)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateUpdateUser = validateUpdateUser;