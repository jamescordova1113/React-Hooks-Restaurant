const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/login')
  .post(authController.signIn);

router.route('/signup')
  .post(authController.signUp);

router.route('/update')
  .put(authMiddleware, authController.updateProfile);

module.exports = router;