const config = require('../config');
const { User, validateUser, validateUpdateUser } = require('../models/userModel');
const Roles = require('../constants/role');

list = async (req, res, next) => {
  try {
    const { listCount, currentPage } = req.query;
    let where;
    
    if (req.user.role === Roles.MANAGER) {
      where = { role: {$eq: Roles.USER}};
    } else if (req.user.role === Roles.ADMIN) {
      where = { _id: {$ne: req.user._id} };
    }
    
    const userlist = await User
      .find(where)
      .skip(parseInt(currentPage * listCount))
      .limit(parseInt(listCount))
      .select('-password');
   
    const totalCount = await User.countDocuments(where);
    res.json({userlist, listCount, totalCount, currentPage});
  } catch (error) {
    next(error);
  }
}

create = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let exist = await User.findOne({email: req.body.email});
    if (exist) {
      return res.status(400).send("User already existed");
    }

    if (req.body.role === Roles.MANAGER && req.body.role === Roles.ADMIN) {
      return res.status(403).send("Permission denied. You are not able to create admin role");
    }

    const user = new User(req.body);
    const newUser = await user.save();
    res.json(newUser);

  } catch(error) {
    next(error);
  }
}

update = async (req, res, next) => {
  try {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    const userId = req.params.id;
    let user;
    if (!req.body.password) {
      user = await User.findById(userId).select("-password");
    } else {
      user = await User.findById(userId);
    }

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    next (error);
  }
}

remove = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    await User.remove({_id: req.params.id});
  } catch (error) {
    next (error);
  }
}

module.exports = {
  list,
  create,
  update,
  remove
};