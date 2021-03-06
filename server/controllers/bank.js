const axios = require('axios');
const qs = require('qs');
const { v4: uuidv4 } = require('uuid');

const getRandomPlaces = () => {
  return [
    { name: 'Wendys', latitude: '26.094760', longitude: '-80.368990', id: 1 },
    { name: 'McDonalds', latitude: '26.118290', longitude: '-80.393810', id: 2 },
    { name: 'Walmart', latitude: '26.148029', longitude: '-80.318520', id: 3 },
    { name: 'Burger King', latitude: '26.124110', longitude: '-80.361350', id: 4 }
  ];
};

const retryAxios = (...params) => {
  return axios(...params).catch(err => {
    console.log(err.message);
    console.log('Retrying...');
    return axios(...params).catch(err => {
      console.log(err.message);
      console.log('Fetch failed twice.');
      console.log('Retrying again...');
      return axios(...params).catch(err => {
        console.log(err.message);
        console.log('Fetch failed three times, giving up.');
      });
    });
  });
};

const getAllAccountsInfo = async (userNumber) => {
  const accessToken = await getAuthCode().catch(err => console.log(err.message));
  const accounts = await getAccounts(userNumber, accessToken).catch(err => console.log(err.message));
  console.log(accounts);
  const accountInfo = accounts.map(account => {
    // we don't have to hardcode this, there are 299 users
    return { accountNumber: account.accountNumber, currentBalance: account.currentBalance, availableBalance: account.availableBalance, category: account.category, description: account.description };
  });

  return {
    status: 200,
    data: accountInfo
  };
};

const getAllTransactions = async (userNumber) => {
  const accessToken = await getAuthCode().catch(err => console.log(err.message));
  const accounts = await getAccounts(userNumber, accessToken).catch(err => console.log(err.message));
  const ids = accounts.map(account => {
    // we don't have to hardcode this, there are 299 users
    return { account: account.id, user: 'HACKATHONUSER100' };
  });

  const idtmp = [ids[0]];

  const transactions = await Promise.allSettled(idtmp.map(async cur => {
    const config = {
      method: 'get',
      url: `http://ncrdev-dev.apigee.net/digitalbanking/db-transactions/v1/transactions?accountId=${cur.account}&hostUserId=${cur.user}`,
      headers: { 
        'Authorization': 'Bearer ' + accessToken, 
        'transactionId': uuidv4(), 
        'Accept': 'application/json'
      }
    };
    const { data } = await retryAxios(config);
    return data.transactions; 
  })).catch(err => console.log(err));

  const goodTransactions = transactions
    .filter(t => t.status === 'fulfilled')
    .filter(t => t.value !== undefined)
    .map(t => t.value)
    .flat();
  
  const randomPlaces = getRandomPlaces();
  
  const simpleTransactions = goodTransactions.map(t => {
    const index = Math.floor(Math.random() * randomPlaces.length);
    const location = randomPlaces[index];
    return {
      amount: t.amount.amount,
      date: t.transactionDate,
      place: location,
      id: t.id
    };
  });
  console.log(simpleTransactions);

  return {
    status: 200,
    data: simpleTransactions
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

  return retryAxios(config)
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
      transactionId: uuidv4(),
      Accept: 'application/json'
    },
    data: data
  };
  const { data: d } = await retryAxios(config);
  return d.accounts;
};

module.exports = { getAllTransactions, getAllAccountsInfo };
