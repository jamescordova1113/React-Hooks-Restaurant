const config = require('../config');
const User = require('../models/userModel');
const Roles = require('../constants/role');

create = async (req, res, next) => {
  try {
    const { 
      firstName,
      lastName,
      email,
      password,
      role  
    } = req.body;

    let user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;
    user.password = await user.encryptPassword(password);

    await user.save();

    return res.send({ user });
  } catch(error) {
    next(error);
  }
}

module.exports = {
  create
};