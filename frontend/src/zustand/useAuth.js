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
      toast.error(err.response?.data?.msg);
    } finally {
      set({ Loading: false });
    }
  },
}));

export default useAuth;
