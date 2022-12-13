const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @desc      Create new user
// @route     POST /api/users/
// @access    Private
exports.createUser = async (req, res) => {
  console.log(req.body)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      errors: [{ msg: 'User already exists' }]
    });
  }
  user = new User({ name, email, password });

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: { id: user.id }
    }

    jwt.sign(
      payload,
      process.env.JWT_TOKEN,
      { expiresIn: process.env.TOKEN_EXP },
      (err, token) => {
        if (err) { 
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}


// @desc      Get all users
// @route     GET /api/users/
// @access    Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while fetching users.'
    });
  }
}