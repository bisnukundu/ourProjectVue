import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfig = defineStore("config", function () {
  const API_URL = "http://127.0.0.1:8000/api";
  const getUserInfo = () => {
    return JSON.parse(localStorage.getItem("userinfo"));
  };
  const getToken = () => {
    return localStorage.getItem("loginToken");
  };
  return { API_URL, getUserInfo, getToken };
});
