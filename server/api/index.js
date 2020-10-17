const express = require('express');
const authRoute = require('./auth.js');
const banking = require('./banking.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/banking', banking);

module.exports = router;
