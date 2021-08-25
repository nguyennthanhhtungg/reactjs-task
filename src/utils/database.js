import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://shoponlinetask.herokuapp.com/api',
  timeout: 5000
});
