import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useProduct = create((set, get) => ({
  products: [],
  searchingProduct: false,
  deleting: null,
  creating: false,

  getProducts: async () => {
    try {
      set({ searchingProduct: true });
      const res = await axiosInstance.get("/product/products");
      set({ products: res.data });
    } catch (err) {
      toast.error(err.response?.data?.msg);
    } finally {
      set({ searchingProduct: false });
    }
  },

  CreateProduct: async () => {
    try {
      set({ creating: true });
      await axiosInstance.post("/product/create");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.msg);
      return { success: false };
    } finally {
      set({ creating: false });
    }
  },

  DelProduct: async (id) => {
    try {
      set({ deleting: id });
      await axiosInstance.delete(`/product/delete/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      toast.success("deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    } finally {
      set({ deleting: null });
    }
  },
}));

export default useProduct;
