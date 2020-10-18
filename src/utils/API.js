import axios from 'axios';
import { API_BASE } from '@env';
const API = {
  login: (data) => axios.post(`http://${API_BASE}:8080/api/auth/login`, data),
  getTransactions: (id) => axios.get(`http://${API_BASE}:8080/api/banking/transactions/${id}`),
  createFraudulentTransaction: (data) => axios.post(`http://${API_BASE}:8080/api/fraudulent`, data),
  getFraudulentTransactions: () => axios.get(`http://${API_BASE}:8080/api/fraudulent`),
  getAccounts: (id) => axios.get(`http://${API_BASE}:8080/api/banking/accounts/${id}`),
  signup: (data) => axios.post(`http://${API_BASE}:8080/api/auth/create`, data)
};

export default API;
