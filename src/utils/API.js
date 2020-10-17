import axios from 'axios';
import { API_BASE } from '@env'
const API = {
  login: (data) => axios.post(`http://${API_BASE}:8080/api/auth/login`, data),
  signup: (data) => axios.post(`http://${API_BASE}:8080/api/auth/create`, data)
}

export default API;