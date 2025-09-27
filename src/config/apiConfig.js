import axios from "axios";

// The URL for your live, deployed backend on Railway
const productionUrl = "https://ecommerce-backend-production-96f4.up.railway.app";

// The URL for your local backend server for testing
const developmentUrl = "http://localhost:5454";

// This line automatically chooses the correct URL based on the environment
const API_BASE_URL = process.env.NODE_ENV === 'development' ? developmentUrl : productionUrl;

// Create an axios instance with the automatically chosen base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add a request interceptor to automatically include the JWT token in every API call
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});