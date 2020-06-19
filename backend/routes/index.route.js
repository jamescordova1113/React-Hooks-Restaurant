const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const recordRoute = require('./record.route');
const authMiddleware = require('../middleware/auth');

router.use('/auth', authRoute);
router.use('/user', authMiddleware, userRoute);
router.use('/record', authMiddleware, recordRoute);

module.exports = router;
