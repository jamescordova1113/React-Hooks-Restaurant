const { User, validateUser, validateUpdateUser } = require("../models/userModel");

signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.isPasswordValid(req.body.isPasswordValid)) {
      const token = user.generateAuthToken();
      res.json({
        info: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        token
      });
    } else {
      return res.status(401).send("Invalid login credential");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
    next(error);
  }
};

signUp = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      return res.status(400).send("User already existed");
    }

    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    const signedUser = await user.save();

    res.send({signedUser});
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

updateProfile = async (req, res, next) => {
  try {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ _id: req.user._id });
    Object.assign(user, req.body);
    user.role = req.user.role;
    const role = req.user.role;
    const updatedUser = await user.save();
    const token = updatedUser.generateAuthToken();
    res.json({
      info: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role
      },
      token
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.module = {
  signIn,
  signUp,
  updateProfile
};