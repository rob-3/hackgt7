const express = require('express');
const authRoute = require('./auth.js');

const router = express.Router();

router.use('/auth', authRoute);

module.exports = router;