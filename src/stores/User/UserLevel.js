import axios from "axios";
import AxiosToken from "../../axios/AxiosToken";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserLevelStore = defineStore("userLevel", function () {
  const userLevel = async () => {
    const response = await AxiosToken.get(`/user/level`);
    return response;
  };
  return { userLevel };
});
