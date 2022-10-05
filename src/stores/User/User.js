import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";
import { UseConfig } from "../../composable/UseConfig";

export const useUserStore = defineStore("user", function () {
  const config = UseConfig();
  const base_url = config.api_base_url;
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
  const userLogout = async () => {
    const config_option = {
      headers: { Authorization: `Bearer ${config.token}` },
    };

    const bodyParameters = {
      key: "value",
    };

    const response = await axios.post(
      `${base_url}/user/logout`,
      bodyParameters,
      config_option
    );
    return response;
  };

  const referral_friend = async (userName, page = 1) => {
    const config_option = {
      headers: { Authorization: `Bearer ${config.token}` },
    };

    const referral_users = await axios.get(
      `${base_url}/user/referral_friend/${userName}?page=${page}`,
      config_option
    );
    return referral_users.data;
  };

  return { userRegister, userLogin, userLogout, referral_friend };
});
