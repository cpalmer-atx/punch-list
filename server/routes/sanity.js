const express = require('express');
const { sanityCheck } = require('../controllers/sanity');

const router = express.Router();

router
  .route('/')
  .get(sanityCheck);

module.exports = router;