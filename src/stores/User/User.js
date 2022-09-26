import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", function () {
  const base_url = "http://127.0.0.1:8000/api";
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
  return { userRegister, userLogin, userLogout };
});
