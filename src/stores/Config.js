import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfig = defineStore("config", function () {
  const API_URL = "http://127.0.0.1:8000/api";
  const USER_INFO = JSON.parse(localStorage.getItem("userinfo"));
  return { API_URL, USER_INFO };
});
