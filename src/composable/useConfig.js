import ls from "localstorage-slim";
export const useConfig = () => {
  const API_URL = "http://127.0.0.1:8000/api";
  const getUserInfo = () => {
    return ls.get("userinfo", { decrypt: true });
  };
  const getToken = () => {
    return localStorage.getItem("loginToken");
  };
  return { API_URL, getUserInfo, getToken };
};
