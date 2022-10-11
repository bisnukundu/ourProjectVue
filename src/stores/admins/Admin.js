import axios from "axios";
import AxiosToken from "../../axios/AxiosToken";
import { defineStore } from "pinia";
import { useConfig } from "../Config";

export const useAdminStore = defineStore("admin", function () {
  const config = useConfig();
  const base_url = config.api_base_url;
  const AdminLogin = async (loginData) => {
    try {
      const response = await axios.post(`${base_url}/admin/login`, loginData);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const getAllUser = async () => {
    const allUser = await AxiosToken.get(
      `${config.api_base_url}/admin/all-user`
    );
    return allUser.data;
  };
  return { AdminLogin, getAllUser };
});
