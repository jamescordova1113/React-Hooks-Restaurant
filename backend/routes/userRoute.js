const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { route } = require('./authRoute');

router.route('/')
  .post(userController.create)
  // .get(userController.list);

// router.route('/:id')
//   .get(userController.read)
//   .put(userController.update)
//   .delete(userController.remove);

// router.param('id', userController.getUserById);

module.exports = router;