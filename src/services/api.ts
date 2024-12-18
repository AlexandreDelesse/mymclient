import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.ade-dev.fr/",
  timeout: 1000,
});

export default instance;
