const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.route('/')
  .post(userController.create)
  .get(userController.list);

router.route('/:id')
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;