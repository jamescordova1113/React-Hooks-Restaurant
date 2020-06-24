const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.route('/')
  .get(planController.list)
  .post(planController.create);

module.exports = router;