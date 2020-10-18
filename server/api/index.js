const express = require('express');
const fraudulent = require('./fraudulent.js');
const authRoute = require('./auth.js');
const banking = require('./banking.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/banking', banking);
router.use('/fraudulent', fraudulent);

module.exports = router;
