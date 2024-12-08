import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api', // URL zu deinem Sails.js-Backend
});

export default api;
