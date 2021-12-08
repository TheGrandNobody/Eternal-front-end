import axios from "axios";

const api = axios.create({
  baseURL: "http://api.crystalelephant.net/api/",
});

export default api;
