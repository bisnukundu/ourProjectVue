import axios from "axios";
import { useConfig } from "../stores/Config";
const config = useConfig();

const instance = axios.create({
  baseURL: config.API_URL,
});

instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("loginToken");
  config.headers = { Authorization: `Bearer ${token}` };
  return config;
});
export default instance;
