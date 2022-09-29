import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", function () {
  const base_url = "http://127.0.0.1:8000/api";
  const user = ref();
  const getUser = () => {};
  const userRegister = async (userData) => {
    try {
      const response = await axios.post(`${base_url}/user/register`, userData);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  const userLogin = async (loginData) => {
    try {
      const response = await axios.post(`${base_url}/user/login`, loginData);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  const userLogout = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      key: "value",
    };

    const response = await axios.post(
      `${base_url}/user/logout`,
      bodyParameters,
      config
    );
    return response;
  };

  const referral_friend = async (userName, token, page = 1) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const referral_users = await axios.get(
      `${base_url}/user/referral_friend/${userName}?page=${page}`,
      config
    );
    return referral_users.data;
  };

  return { userRegister, userLogin, userLogout, referral_friend };
});
