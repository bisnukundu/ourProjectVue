import ls from "localstorage-slim";
export const useConfig = () => {
  const API_URL = "https://maruf.ungolpedealtura.es/public/api";
  // const API_URL = "http://127.0.0.1:8000/api";
  const APP_NAME = "OurProject";
  const DOMAIN = window.location.origin;
  const getUserInfo = () => {
    return ls.get("userinfo", { decrypt: true });
  };
  const getToken = () => {
    return localStorage.getItem("loginToken");
  };
  return { API_URL, getUserInfo, getToken, APP_NAME, DOMAIN };
};
