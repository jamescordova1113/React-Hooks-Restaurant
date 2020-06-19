const jwt = require('jsonwebtoken');
const config = require('../config');
const User = requrie('../models/user');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validations/login');
