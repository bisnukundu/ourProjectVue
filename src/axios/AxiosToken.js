import axios from "axios";
import { useConfig } from "../composable/useConfig";
const config = useConfig();

const instance = axios.create({
  baseURL: config.API_URL,
});

instance.interceptors.request.use(function (config_request) {
  config_request.headers = {
    Authorization: `Bearer ${config.getToken()}`,
    "Access-Control-Allow-Origin": "http://maruf.ungolpedealtura.es/",
  };

  return config_request;
});
export default instance;
