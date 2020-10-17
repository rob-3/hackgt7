const axios = require('axios');
const qs = require('qs');
const { v4: uuidv4 } = require('uuid');

const getAllTransactions = async (userNumber) => {
  const accessToken = await getAuthCode();
  const accounts = await getAccounts(userNumber, accessToken);
  const ids = accounts.map(account => account.id);


  const transactions = ids.map(async id => {
    const params = {
      accountId: 'HACKATHONUSER' + userNumber,
      hostUserId: id
    };
    const config = {
      method: 'get',
      url: 'http://ncrdev-dev.apigee.net/digitalbanking/db-transactions/v1/transactions?' + qs.stringify(params),
      headers: { 
        'Authorization': 'Bearer ' + accessToken, 
        'transactionId': uuidv4(), 
        'Accept': 'application/json'
      }
    };
    const { data } = await axios(config).catch(err => console.err(err));
    return data.transactions;
  });

  const flattenedTransactions = await Promise.all(transactions).then(arr => arr.flat());
  const finalTransactions = flattenedTransactions.map(t => {
    return {
      id: t.id,
      memo: 'Chick-fil-a',
      amount: t.amount.amount,
    };
  });

  return {
    status: 200,
    data: finalTransactions
  };
};

const getAuthCode = async () => {
  const data = qs.stringify({
    'grant_type': 'client_credentials',
    'scopes': 'accounts:read,transactions:read,transfers:write,account:write,institution-users:read,recipients:read,recipients:write,recipients:delete,disclosures:read,disclosures:write' 
  });
  const config = {
    method: 'post',
    url: 'http://ncrdev-dev.apigee.net/digitalbanking/oauth2/v1/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Basic alI3RWg3dUF5cFQ0dEpMb0xVMmRBTVlHQ1l5ejZsVjg6T3FRZXQ0OE5YWDdTQXB4SA==', 
      'transactionId': uuidv4(), 
      'institutionId': '00516', 
      'Accept': 'application/json'
    },
    data : data
  };

  return axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data.access_token));
      return response.data.access_token;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getAccounts = async (userNumber, accessToken) => {
  const data = qs.stringify({
    'grant_type': 'client_credentials',
    'scopes': 'accounts:read,transactions:read,transfers:write,account:write,institution-users:read,recipients:read,recipients:write,recipients:delete,disclosures:read,disclosures:write' 
  });
  const params = { hostUserId: 'HACKATHONUSER' + userNumber };
  const config = {
    url: 'http://ncrdev-dev.apigee.net/digitalbanking/db-accounts/v1/accounts?' + qs.stringify(params),
    headers: {
      Authorization: 'Bearer ' + accessToken,
      transactionId: uuidv4(),
      Accept: 'application/json'
    },
    data: data
  };
  const { data: d } = await axios(config);
  return d.accounts;
  
};

module.exports = { getAllTransactions };
