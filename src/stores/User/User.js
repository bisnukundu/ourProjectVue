import axios from "axios";
import AxiosToken from "../../axios/AxiosToken";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useConfig } from "../../composable/useConfig";

export const useUserStore = defineStore("user", function () {
  const userRegister = async (userData) => {
    try {
      const response = await axios.post(`/user/register`, userData);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  const userLogin = async (loginData) => {
    try {
      const response = await axios.post(`/user/login`, loginData);
      console.log("UserStore login", response);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  const userLogout = async () => {
    const response = await AxiosToken.post(`/user/logout`);
    return response;
  };

  const referral_friend = async (userName, page = 1) => {
    const referral_users = await AxiosToken.get(
      `/user/referral_friend/${userName}?page=${page}`
    );

    return referral_users.data;
  };
  const getUser = async (id = null) => {
    const response = await AxiosToken.get(`/user/user/${id ?? ""}`);
    return response;
  };

  const getUserByUserName = async (username = "") => {
    return await AxiosToken.get(`user/username/${username}`);
  };

  const balanceHistory = async (page = 1) => {
    const response = await AxiosToken.get(`user/balance-history?page=${page}`);
    return response.data;
  };

  return {
    userRegister,
    userLogin,
    userLogout,
    referral_friend,
    getUser,
    getUserByUserName,
    balanceHistory,
  };
});
