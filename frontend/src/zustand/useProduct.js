import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useProduct = create((set, get) => ({
  products: [],
  searchingProduct: false,
  deleting: false,

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

  DelProduct: async (id) => {
    set({ deleting: true });
    try {
      await axiosInstance.delete(`/product/delete/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      toast.success("deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    } finally {
      set({ deleting: false });
    }
  },
}));

export default useProduct;
