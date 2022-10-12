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

  const getAllUser = async (page = 1, searchName = "") => {
    const allUser = await AxiosToken.get(
      `/admin/all-user/${searchName}/?page=${page}`
    );
    console.log(searchName);
    return allUser.data;
  };
  return { AdminLogin, getAllUser };
});
