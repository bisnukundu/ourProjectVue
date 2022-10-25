import axios from "axios";
import AxiosToken from "../../axios/AxiosToken";
import { defineStore } from "pinia";
import { useConfig } from "../../composable/useConfig";
export const useAdminStore = defineStore("admin", function () {
  const config = useConfig();

  const AdminLogin = async (loginData) => {
    try {
      const response = await axios.post(`/admin/login`, loginData);
      console.log("AdminStore login", response);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const getAllUser = async (page = 1, searchName = "") => {
    let allUser;

    if (searchName) {
      allUser = await AxiosToken.get(
        `/admin/all-user/${searchName}?page=${page}`
      );
    } else {
      allUser = await AxiosToken.get(`/admin/all-user?page=${page}`);
    }

    return allUser.data;
  };

  const activeUser = async (id = "") => {
    const response = await AxiosToken.put(`/admin/active-user/${id}`);
    return response.data;
  };

  const sendBalance = async (data = {}) => {
    const response = await AxiosToken.put(`/admin/send-balance`, data);
    return response.data;
  };
  const adminSendBalance = async (data = {}) => {
    const response = await AxiosToken.put(`/admin/admin-send-balance`, data);
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
    sendBalance,
    adminSendBalance,
  };
});
