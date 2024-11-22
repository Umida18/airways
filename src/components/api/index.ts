import axios from "axios";

// token = 84d2ca3f5f5327c3979341c9f4f2b3634bd3c029ac316b21b4905ff49cde3ff829dc17a1e53fbcfe23a3a677ebc0b21bb4c2754ed1fdc8cb5bc5f75f5b81e12b331cf6ff87baeba42092cf267538179767dd13dce28a13be65adc8f6b3a9ece7f1d0377bc9a0e9182c5b1db6447a10ec34cb84d352522d6363f8362e2038db98
const api = axios.create({
  // baseURL: "https://9589bbbe17ab42f8.mokky.dev/",
  baseURL: "http://64.227.151.3:8080/api",
  timeout: 30000,
});
export const baseURL = "http://64.227.151.3:8080/api";

// Access tokenni olish va har bir so'rovga qo'shish uchun interseptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token"); // access tokenni localStorage'dan olish
    // console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
