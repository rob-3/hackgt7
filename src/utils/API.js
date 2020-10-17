import axios from 'axios';
import { API_BASE } from '@env'
const API = {
  login: (data) => axios.post(`http://${API_BASE}:8080/api/auth/login`, data)
}

export default API;