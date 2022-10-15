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

  return { userRegister, userLogin, userLogout, referral_friend };
});
