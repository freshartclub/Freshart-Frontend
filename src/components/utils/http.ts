import axios from "axios";
console.log(import.meta.env.VITE_SERVER_BASE_URL);

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 300000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "69420",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
