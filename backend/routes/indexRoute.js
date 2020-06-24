const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
// const planRoute = require('./planRoute');
const authMiddleware = require('../middleware/authMiddleware');

router.use('/', authRoute);
router.use('/user', authMiddleware, userRoute);
// router.use('/', authMiddleware, planRoute);

module.exports = router;