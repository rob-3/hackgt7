const router = require('express').Router();
const fraudulent = require('../controllers/fraudulent');

router.post('/', async (req, res) => {
  const { status, data } = await fraudulent.createFraudulentTransaction(req.body);
  res.status(status).send(data);
});

router.get('/', async (req, res) => {
  const { status, data } = await fraudulent.getAllFraudulentTransactions();
  res.status(status).send(data);
});

module.exports = router;
