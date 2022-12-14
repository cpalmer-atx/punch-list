const { check } = require('express-validator');
const express = require('express');

const { getUsers, getUser, getUserByEmail, 
        createUser, deleteUser, updateUser } = require('../controllers/user');

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post([
    check('name', 'Name field required').not().isEmpty(),
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password with more than 4 characters required').isLength({ min: 5 })
  ], createUser);

router
  .route('/search')
  .get([
    check('email', 'Valid email required').isEmail()
  ], getUserByEmail);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;