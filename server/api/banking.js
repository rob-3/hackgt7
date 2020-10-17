const router = require('express').Router();
const bank = require('../controllers/bank');

router.get('/transactions', async (req, res) => {
  const { status, data } = await bank.getAllTransactions();
  res.status(status).send(data);
});

module.exports = router;
