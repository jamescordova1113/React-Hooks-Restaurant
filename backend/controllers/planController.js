const { Plan, validatePlan, validateUpdatePlan } = require("../models/planModel");
const ObjectId = require('mongodb').ObjectID;
const Roles = require('../constants/role');

create = async (req, res, next) => {
  try {
    const { error } = validatePlan(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const plan = new Plan(req.body);
    const newPlan = await plan.save();
    res.json(newPlan);
  } catch(error) {
    next(error);
  }
}

list = async (req, res, next) => {
  try {
    let { currentPage, listCount } = req.query;
    let where = {userId: req.query._id};
    const plans = await Plan
      .find(where)
      .skip(parseInt(currentPage * listCount))
      .limit(parseInt(listCount));

    const totalCount = await Plan.countDocuments(where);
    res.json({plans, listCount, totalCount, currentPage});
  } catch (error) {
    next(error);
  }
}

remove = async (req, res, next) => {
  try {
    const { error } = validatePlan(req.body);
    await Plan.deleteOne({_id: req.params.id});
  } catch (error) {
    next (error);
  }
}

update = async (req, res, next) => {
  try {
    const { error } = validateUpdatePlan(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    const planId = req.params.id;
    let plan;
    plan = await Plan.findById(planId);
    Object.assign(plan, req.body);
    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } catch (error) {
    next (error);
  }
}

futureList = async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const nextFirstDay = new Date(year, month, 1);
    const nextLastDay = new Date(year, month + 1, 1);
    let query = { userId: req.query[0], startDate: { $gte: nextFirstDay, $lt: nextLastDay }};

    Plan.find(query)
      .then((plan) => {
        console.log(plan);
        res.json({plan});
      })
      .catch(next);
  } catch (error) {
    next (error);
  }
}

module.exports = {
  list,
  create,
  update,
  remove,
  futureList,
};