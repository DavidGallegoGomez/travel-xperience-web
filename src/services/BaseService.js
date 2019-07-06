import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true
})

// TODO: Mejorar con hooks
http.interceptors.response.use(
  (response) => response,
  (error) => error.status === 403 ? window.location = "/login" : Promise.reject(error)
);

export default http;