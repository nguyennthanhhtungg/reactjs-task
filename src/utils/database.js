import axios from 'axios';

//'https://shoponlinetask.herokuapp.com/api',
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 10000,
  withCredentials: true
});
