import axios from 'axios';
import qs from 'qs';
export const getAuthCode = () => {
  var data = qs.stringify({
   'grant_type': 'client_credentials',
  'scopes': 'accounts:read,transactions:read,transfers:write,account:write,institution-users:read,recipients:read,recipients:write,recipients:delete,disclosures:read,disclosures:write' 
  });
  var config = {
    method: 'post',
    url: 'http://ncrdev-dev.apigee.net/digitalbanking/oauth2/v1/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Basic alI3RWg3dUF5cFQ0dEpMb0xVMmRBTVlHQ1l5ejZsVjg6T3FRZXQ0OE5YWDdTQXB4SA==', 
      'transactionId': '0cd335cd-58ce-459c-baba-0c0a638d6783', 
      'institutionId': '00516', 
      'Accept': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}
