import axios from "axios";
import AxiosToken from "../../axios/AxiosToken";
import { defineStore } from "pinia";
import { useConfig } from "../../composable/useConfig";
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
    return allUser.data;
  };

  const activeUser = async (id = "") => {
    const response = await AxiosToken.put(`/admin/active-user/${id}`);
    return response.data;
  };

  const sendActiveBalance = async (data = {}) => {
    const response = await AxiosToken.put(`/admin/send-active-balance`, data);
    return response.data;
  };

  const deactiveUser = async (id = "") => {
    const response = await AxiosToken.put(`/admin/deactive-user/${id}`);
    return response.data;
  };

  const deleteUser = async (id) => {
    const response = await AxiosToken.delete(`/admin/delete-user/${id}`);
    return response;
  };

  return {
    AdminLogin,
    getAllUser,
    activeUser,
    deactiveUser,
    deleteUser,
    sendActiveBalance,
  };
});
