import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_BASE_URL = BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
