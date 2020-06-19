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
  latName: {
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

const validateUser = (user) => {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).optional().email(),
    password: Joi.string().min(3).max(50).required(),
    role: Joi.number().integer().optional().min(0).max(2).default(ROLES.USER)
  };

 return Joi.validate(user, schema);
}

const validateUpdateUser = (user) => {
  const schema = {
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).reuiqred(),
    email: Joi.string().min(5).max(50).optional().email(),
    password: Joi.string().min(3).max(50).optional(),
    role: Joi.number().integer().optional().min(0).max(2).default(ROLES.USER)
  };

  return Joi.validate(user, schema);
}

exports.user = User;
exports.validate = validateUser;
exports.validateUpdate = validateUpdateUser;