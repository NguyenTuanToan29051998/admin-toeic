import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
    Accepted: 'appication/json',
    Connection: 'keep-alive',
    DNT: 1,
    // Origin: 'http://localhost:5000',
  },
});

export default axiosInstance;
