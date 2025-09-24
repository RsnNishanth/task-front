import axios from "axios";

const api = axios.create({
  baseURL: "https://task-back-cluu.onrender.com/api",
});

// Add token to headers automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Use backticks ` ` for template literal
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
