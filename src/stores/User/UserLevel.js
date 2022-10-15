import AxiosToken from "../../axios/AxiosToken";

import { defineStore } from "pinia";

export const useUserLevelStore = defineStore("userLevel", function () {
  const userLevel = async () => {
    const response = await AxiosToken.get(`/user/level`);
    return response;
  };

  const getTeam = async () => {
    const response = await AxiosToken.get(`/user/my-team`);
    return response;
  };

  return { userLevel, getTeam };
});
