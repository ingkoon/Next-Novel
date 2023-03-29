import axios from "axios";

const apiClient = axios.create({
  // headers: {},
  baseURL: "http://localhost:8000/",
});

export default apiClient;
