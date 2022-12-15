const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @desc      Create new user
// @route     POST /api/users/
// @access    Private
exports.createUser = async (req, res) => {
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
        res.json({ token: token, data: user });
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
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while fetching users.',
      error: error
    });
  }
}


// @desc      Find user by email
// @route     GET /api/users/search
// @access    Public
exports.getUserByEmail = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const user = await User.findOne(req.body).select('-_id -password');
    
    if (user.email !== req.body.email) {
      return res.status(400).json({
        success: false,
        msg: `No user associated with ${req.body.email} found.`
      });
    }
    res.status(200).json({ success: true, data: user });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while fetching user.',
      error: error
    });
  }
}


// @desc      Find user by id
// @route     GET /api/users/:id
// @access    Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'No user with provided id found.'
      });
    }
    res.status(200).json({ success: true, data: user });

  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while fetching user.',
      error: error
    });
  }
}


// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'No user with provided id found.'
      });
    }
    res.status(200).json({ success: true, data: {} });

  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while deleting user.',
      error: error
    });
  }
}


// @desc      Update user
// @route     PUT /api/users/:id
// @access    Private
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, runValidators: true }
      );

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'No user with provided id found.'
      });
    }
    res.status(200).json({ success: true, data: user });

  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while updating user.',
      error: error
    });
  }
}