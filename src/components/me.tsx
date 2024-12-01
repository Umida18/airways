import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  [key: string]: any; // Token ichida boshqa ma'lumotlar ham bo'lishi mumkin
}

/**
 * Tokenni dekod qilib, foydalanuvchi ID ni qaytaradi
 * @param token JWT token
 * @returns Foydalanuvchi ID yoki null
 */
export const decodeToken = (token: string): number | null => {
  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded.id || null;
  } catch (error) {
    console.error("Tokenni dekod qilishda xatolik:", error);
    return null;
  }
};
