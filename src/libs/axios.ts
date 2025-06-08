import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "@/services/users";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ใส่ access token ในทุก request
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ตรวจจับ token หมดอายุ และ refresh + retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ถ้าเป็น 401 และยังไม่พยายาม retry
    if (
      error.response?.status === 401 &&
      error.response.data?.error === "jwt expired"
    ) {
      try {
        const token = Cookies.get("refresh_token") || "";
        const { access_token, refresh_token } = await refreshToken(token);

        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", refresh_token);
        return api(originalRequest); // retry original request
      } catch (err) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/deal"; // หรือ "/login"
        return Promise.reject(err);
      }
    } else {
      const customError = new Error("Something went wrong");
      customError.name = "APIError";
      Promise.reject(customError);
    }

    return Promise.reject(error);
  }
);

export default api;
