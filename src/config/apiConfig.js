// src/config/apiConfig.js
import axios from "axios";

export const API_BASE_URL = "ecommerce-backend-production-96f4.up.railway.app";

// ✅ Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// ✅ Add token dynamically for each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
