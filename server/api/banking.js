const router = require('express').Router();
const bank = require('../controllers/bank');

router.get('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { status, data } = await bank.getAllTransactions(id);
  res.status(status).send(data);
});

module.exports = router;
