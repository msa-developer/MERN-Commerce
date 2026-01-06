import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useAuth = create((set) => ({
  authUser: null,
  LoadingAuth: false,

  checkAuth: async () => {
    try {
      set({ LoadingAuth: true });
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
      if (err.response?.data?.msg) toast.error(err.response.data.msg);
    } finally {
      set({ LoadingAuth: false });
    }
  },

  Login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to login");
    }
  },

  Signin: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to register");
    }
  },

  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to logout");
    }
  },
}));

export default useAuth;
