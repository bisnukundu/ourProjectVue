import axios from "axios";
import AxiosToken from "../../axios/AxiosToken";
import { defineStore } from "pinia";
import { useConfig } from "../Config";

export const useAdminStore = defineStore("admin", function () {
  const config = useConfig();

  const AdminLogin = async (loginData) => {
    try {
      const response = await axios.post(`/admin/login`, loginData);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const getAllUser = async () => {
    const allUser = await AxiosToken.get(`/admin/all-user`);
    return allUser;
  };
  return { AdminLogin, getAllUser };
});
