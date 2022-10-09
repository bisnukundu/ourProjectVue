export const UseConfig = () => {
  return {
    api_base_url: "http://127.0.0.1:8000/api",
    token: localStorage.getItem("loginToken"),
    userInfo: JSON.parse(localStorage.getItem("userinfo")),
  };
};
