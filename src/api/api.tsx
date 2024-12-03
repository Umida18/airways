// import axios from "axios";
// import { BASE_URL } from "../config";

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 30000,
// });

// if (typeof window !== "undefined") {
//   api.interceptors.request.use(
//     (config) => {
//       const accessToken = localStorage.getItem("token");
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
// }

// export default api;
import axios from "axios";
import { BASE_URL } from "../config";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Request interceptor for adding token to requests
if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

// Response interceptor to handle userId from the response
if (typeof window !== "undefined") {
  api.interceptors.response.use(
    (response) => {
      // Assuming the response contains `userId` in the data object
      const { userId, token } = response.data; // Extract userId from response
      if (userId) {
        // Optionally, you can store the userId locally if needed
        localStorage.setItem("userId", userId);
        console.log("Token", token);
      }
      return response;
    },
    (error) => Promise.reject(error)
  );
}

localStorage.getItem("userId");
export default api;
