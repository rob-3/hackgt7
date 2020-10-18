const db = require('../db').client;
const { v4: uuidv4 } = require('uuid');

const fraudulent = {
  createFraudulentTransaction: async (data) => {
    try {
      const doc = await db.execute(`SELECT * FROM fraudulent WHERE latitude=${data.latitude} AND longitude=${data.longitude} ALLOW FILTERING`);
      if (doc.rowLength === 0) {
        await db.execute(`INSERT INTO fraudulent(name, id, latitude, longitude, count, type) VALUES('${data.name}',${uuidv4()}, ${data.latitude}, ${data.longitude}, 1, 'stolen')`);
        return { status: 200, data: 'Fraudulent Transaction Created Successfully' };
      }
      await db.execute(`UPDATE fraudulent SET count = ${doc.rows[0].count+1} WHERE id=${doc.rows[0].id}`);
      return { status: 200, data: 'Fraudulent Transaction Count Successfully Updated' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
  getAllFraudulentTransactions: async () => {
    try {
      const doc = await db.execute('SELECT * FROM fraudulent');
      if (doc.rowLength > 0) {
        return { status: 200, data: doc.rows };
      }
      return { status: 404, data: 'Transactions Not Found' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  }
};

module.exports = fraudulent;