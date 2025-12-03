import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useProduct = create((set, get) => ({
  products: [],
  searchingProduct: false,
  creating: false,
  selectedProduct: null,

  setSelectedProduct: (id) => set({ selectedProduct: id }),

  getProducts: async () => {
    try {
      const res = await axiosInstance.get("/product/products");
      if (Array.isArray(res.data)) {
        set({ products: res.data });
      } else {
        set({ products: [] });
        console.error("API response for products was not an array:", res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg);
    } finally {
      set({ searchingProduct: false });
    }
  },

  CreateProduct: async (data) => {
    try {
      set({ creating: true });
      await axiosInstance.post("/product/create", data);
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
      await axiosInstance.delete(`/product/delete/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      toast.success("deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  },

  updateProduct: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/product/update/${id}`, data);
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.msg);
      return { success: false };
    }
  },

  getProduct: async (id) => {
    try {
      const res = await axiosInstance.get(`/product/${id}`);
      return { info: res.data };
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  },
}));

export default useProduct;
