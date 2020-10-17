const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db').client;
const { v4: uuidv4 } = require('uuid');

const user = {
  createUser: async (data) => {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const doc = await db.execute(`SELECT * FROM user WHERE username='${data.username}'`)
      if (doc.rowLength === 0) {
        await db.execute(`INSERT INTO user(username, id, password) VALUES('${data.username}',${uuidv4()}, '${hash}')`)
        return { status: 200, data: 'Account Created Successfully' };
      }
      return { status: 409, data: 'Username already in use' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
  authenticateUser: async (data) => {
    try {
      const doc = await db.execute(`SELECT * FROM user WHERE username='${data.username}'`)
      if (doc.rowLength > 0) {
        const success = await bcrypt.compare(data.password, doc.rows[0].password);
        if (success) {
          const { password, ...rest } = doc.rows[0];
          const token = jwt.sign({ username: data.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
          return { status: 200, data: { token, ...rest } };
        }
        return { status: 401, data: 'Invalid Credentials' };
      }
      return { status: 404, data: 'Account not found' };
    } catch (e) {
      return { status: 500, data: e.message };
    }
  },
};

module.exports = user;