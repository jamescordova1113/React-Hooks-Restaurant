const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
// const recordRoute = require('./recordRoute');
const authMiddleware = require('../middleware/authMiddleware');

router.use('/auth', authRoute);
router.use('/user', authMiddleware, userRoute);
// router.use('/record', authMiddleware, recordRoute);

module.exports = router;