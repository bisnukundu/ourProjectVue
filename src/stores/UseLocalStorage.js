import { defineStore } from "pinia";
import ls from "localstorage-slim";
import { ref } from "vue";
export const useLocalStorage = defineStore("localstore", () => {
  const userInfo = ref();
  const getUserInfo = () => {
    const response = ls.get("userinfo", { decrypt: true });
    userInfo.value = response;
    return response;
  };
  return { userInfo, getUserInfo };
});
