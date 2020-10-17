const axios = require('axios');
const qs = require('qs');
const { v4: uuidv4 } = require('uuid');
let transactionId;

const getAllTransactions = async (userNumber) => {
  transactionId = uuidv4();
  const accessToken = await getAuthCode();
  const accounts = await getAccounts(userNumber, accessToken);

  const ids = accounts.map(account => {
    // we don't have to hardcode this, there are 299 users
    return { account: account.id, user: 'HACKATHONUSER100' };
  });

  const transactions = await Promise.allSettled(ids.map(async cur => {
    const config = {
      method: 'get',
      url: `http://ncrdev-dev.apigee.net/digitalbanking/db-transactions/v1/transactions?accountId=${cur.account}&hostUserId=${cur.user}`,
      headers: { 
        'Authorization': 'Bearer ' + accessToken, 
        'transactionId': transactionId, 
        'Accept': 'application/json'
      }
    };
    try {
      const { data } = await axios(config);
      return data.transactions; 
    } catch (err) {
      console.log(err.message);
    }
  }));

  const goodTransactions = transactions
    .filter(t => t.status === 'fulfilled')
    .filter(t => t.value !== undefined)
    .map(t => t.value)
    .flat();
  console.log(goodTransactions);

  return {
    status: 200,
    data: goodTransactions
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
      'transactionId': transactionId, 
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
    method: 'get',
    url: 'http://ncrdev-dev.apigee.net/digitalbanking/db-accounts/v1/accounts?' + qs.stringify(params),
    headers: {
      Authorization: 'Bearer ' + accessToken,
      transactionId: transactionId,
      Accept: 'application/json'
    },
    data: data
  };
  const { data: d } = await axios(config);
  return d.accounts;
  
};

module.exports = { getAllTransactions };
