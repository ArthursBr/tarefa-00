// src/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/auth'  // ⚠️ corresponde ao backend via Nginx
});
