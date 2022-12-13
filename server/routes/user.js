const { check } = require('express-validator');
const express = require('express');
const { getUsers, createUser } = require('../controllers/user');

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post([
    check('name', 'Name field required').not().isEmpty(),
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password with more than 4 characters required').isLength({ min: 5 })
  ], createUser);

module.exports = router;