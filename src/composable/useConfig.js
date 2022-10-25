import ls from "localstorage-slim";
export const useConfig = () => {
  const API_URL = "http://maruf.ungolpedealtura.es/public/api";
  const getUserInfo = () => {
    return ls.get("userinfo", { decrypt: true });
  };
  const getToken = () => {
    return localStorage.getItem("loginToken");
  };
  return { API_URL, getUserInfo, getToken };
};
