import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", function () {
  const base_url = "http://127.0.0.1:8000/api";
  const userRegister = async (userData) => {
    try {
      const response = await axios.post(`${base_url}/user/register`, userData);
      console.log(response);
    } catch (error) {
        console.log('%cUser.js line:11 object', 'color: #007acc;', error);
    }
  };
  return { userRegister };
});
