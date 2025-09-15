import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

// The token is read from localStorage HERE, only once.
const jwt = localStorage.getItem("jwt");

// You can log it right after you get it
console.log("JWT Token on initial file load:", jwt);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // There is an extra space in " Authorization" which might cause issues.
    "Authorization": `Bearer ${jwt}`,
    'Content-Type': "application/json"
  }
});