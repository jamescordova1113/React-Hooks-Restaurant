const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.route('/')
  .get(planController.list)
  .post(planController.create);

router.route('/future')
  .get(planController.futureList);

router.route('/:id')
  .delete(planController.remove)
  .put(planController.update);

module.exports = router;