export const getAuthCode = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", "Basic alI3RWg3dUF5cFQ0dEpMb0xVMmRBTVlHQ1l5ejZsVjg6T3FRZXQ0OE5YWDdTQXB4SA==");
  myHeaders.append("transactionId", "640c8294-f956-42ed-a22c-fe056f4d7981");
  myHeaders.append("institutionId", "00516");
  myHeaders.append("Accept", "application/json");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("scopes", "accounts:read,transactions:read,transfers:write,account:write,institution-users:read,recipients:read,recipients:write,recipients:delete,disclosures:read,disclosures:write");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch("http://ncrdev-dev.apigee.net/digitalbanking/oauth2/v1/token", requestOptions)
    .then(response => {
      console.log(response.status)
      return response.text()
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
