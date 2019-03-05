import axios from "axios";
import { inDevelopment, PORT } from "../../../envs";

export const app = axios.create({
  baseURL: inDevelopment
    ? `http://localhost:${PORT}/api/`
    : "http://localhost:8080/api/"
});

app.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response.data.err)
);

export default app;
