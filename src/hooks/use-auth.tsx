import { login, register } from "../components/regAndAuth/auth";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const loginMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const data = await login(email, password);
      localStorage.setItem("token", data.jwt);
      return data;
    }
  );

  const registerMutation = useMutation(
    async ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => {
      const data = await register(username, email, password);
      localStorage.setItem("token", data.jwt);
      return data;
    }
  );

  const isAuthenticated = () => !!localStorage.getItem("token");
  return { loginMutation, registerMutation, isAuthenticated };
};
