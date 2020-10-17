const express = require('express');
const authRoute = require('./auth.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/banking', authRoute);

module.exports = router;
