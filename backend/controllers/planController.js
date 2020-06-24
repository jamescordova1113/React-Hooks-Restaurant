const { Plan, validate, validateUpdate } = require("../models/planModel");
const ObjectId = require('mongodb').ObjectID;
const Roles = require('../constants/role');

create = async (req, res, next) => {
  try {
    if (req.user.role !== Roles.ADMIN) {
      req.body.user = req.user._id;
    }
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    req.body.startDate = new Date(req.body.startDate).toLocaleDateString();
    req.body.endDate = new Date(req.body.startDate).toLocaleDateString();
    const plan = new Plan(req.body);

    const newPlan = await plan.save();
    res.json(newPlan);
  } catch(error) {
    next(error);
  }
}

list = async (req, res, next) => {
  try {
    let where = {};
    if (req.user.role === Roles.USER || req.user.role === Roles.MANAGER) {
      where = { user: req.user._id };
    }

    const plans = await Plan
      .finds(where)
      .populate('user', '-password')
      .sort('-date');
    const count = await Plan.countDocuments(where);
    res.json({plans, count});
  } catch (error) {
    next(error);
  }
}