import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useAuth = create((set, get) => ({
  authUser: null,
  LoadingAuth: false,

  checkAuth: async () => {
    try {
      set({ Loading: true });
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
    } finally {
      set({ Loading: false });
    }
  },

  Login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  },

  Signin: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  },

  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  },
}));

export default useAuth;
