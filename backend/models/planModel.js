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
    date: Joi.date().required().default(Date.now()),
    hour: Joi.number().required().min(1).max(24).default(0),
    note: Joi.string().optional().default(''),
    user: Joi.objectId().required(),
  };

  return Joi.validate(plan, schema);
}

const validateUpdatePlan = (plan) => {
  const schema = {
    date: Joi.date().optional(),
    hour: Joi.number().optional().min(1).max(24),
    note: Joi.string().optional(),
    user: Joi.objectId().required(),
  };

  return Joi.validate(plan, schema);
}

const Plan = mongoose.model('Plan', planSchema);

exports.Plan = Plan;
exports.validatePlan = validatePlan;
exports.validateUpdatePlan = validateUpdatePlan;