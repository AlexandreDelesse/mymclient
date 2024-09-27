import axios from "axios";

const instance = axios.create({
  baseURL: "http://85.214.12.96:3001/",
  timeout: 1000,
});

export default instance;
