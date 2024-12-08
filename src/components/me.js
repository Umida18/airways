import { jwtDecode } from "jwt-decode";
/**
 * Tokenni dekod qilib, foydalanuvchi ID ni qaytaradi
 * @param token JWT token
 * @returns Foydalanuvchi ID yoki null
 */
export const decodeToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.id || null;
    }
    catch (error) {
        console.error("Tokenni dekod qilishda xatolik:", error);
        return null;
    }
};
