import axios from "axios";
import { defineStore } from "pinia";
import { UseConfig } from "../../composable/UseConfig";

export const useAdminStore = defineStore("admin", function () {
  const config = UseConfig();
  const base_url = config.api_base_url;
  const AdminLogin = async (loginData) => {
    try {
      const response = await axios.post(`${base_url}/admin/login`, loginData);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  return { AdminLogin };
});
