import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:44307/api',
  timeout: 5000
});
