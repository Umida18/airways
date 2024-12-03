import axios from "axios";
import { BASE_URL } from "../config";

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    console.log("Login response:", response);

    const token = response.data?.token; // Tokenni qaytarish yo'lini tekshiring
    const userId = response.data?.userId; // Tokenni qaytarish yo'lini tekshiring
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      console.log("Token saved to localStorage:", token, userId);
      return response.data;
    } else {
      throw new Error("Token not found in login response.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const register = async (data: {
  username: string;
  surname: string;
  password: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  passportSeries: string;
  role: string;
  balance: number;
}) => {
  try {
    console.log("Sending registration data:", data);
    const response = await axios.post(`${BASE_URL}/auth/register`, data);
    console.log("Full registration response:", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error during registration:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);
    } else {
      console.error("Unexpected error during registration:", error);
    }
    throw error;
  }
};
