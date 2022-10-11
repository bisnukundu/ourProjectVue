import axios from "axios";
import { useConfig } from "../stores/Config";
const config = useConfig();

const instance = axios.create({
  baseURL: config.API_URL,
});

instance.interceptors.request.use(function (config_request) {
  config_request.headers = { Authorization: `Bearer ${config.getToken()}` };
  return config_request;
});
export default instance;
