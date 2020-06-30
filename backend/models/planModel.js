const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const planSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  startDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  endDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const validatePlan = (plan) => {
  const schema = {
    destination: Joi.string().min(1).max(50).required(),
    startDate: Joi.date().required().default(Date.now()),
    endDate: Joi.date().required().default(Date.now()),
    comment: Joi.string().min(1).max(50).required(),
    userId: Joi.objectId().required(),
  };

  return Joi.validate(plan, schema);
}

const validateUpdatePlan = (plan) => {
  const schema = {
    destination: Joi.string().min(1).max(50).optional(),
    startDate: Joi.date().required().default(Date.now()),
    endDate: Joi.date().required().default(Date.now()),
    comment: Joi.string().min(1).max(50).optional(),
    userId: Joi.objectId().optional(),
  };

  return Joi.validate(plan, schema);
}

const Plan = mongoose.model('Plan', planSchema);

exports.Plan = Plan;
exports.validatePlan = validatePlan;
exports.validateUpdatePlan = validateUpdatePlan;