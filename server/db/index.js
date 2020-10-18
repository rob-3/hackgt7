const { Client } = require('cassandra-driver');
let client;

const run = async () => {
  client = new Client({
    cloud: { secureConnectBundle: './secure-connect-hackgt7.zip' },
    credentials: { username: process.env.ASTRA_USER, password: process.env.ASTRA_PASS },
    keyspace: 'FraudApp'
  });
  
  await client.connect();

  client.on('log', (level, loggerName, message, furtherInfo) => {
    console.log(`${level} - ${loggerName}:  ${message}`);
  });

  console.log('connected to db');
};

run();

module.exports = {
  client
};