const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
  .get(userController.list)
  .post(userController.create);

router.route('/:id')
  .delete(userController.remove)
  .put(userController.update);

module.exports = router;