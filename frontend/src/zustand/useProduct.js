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
      set({ searchingProduct: true });
      const res = await axiosInstance.get("/product/products");
      set({ products: res.data });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to fetch products");
    } finally {
      set({ searchingProduct: false });
    }
  },

  CreateProduct: async (data) => {
    try {
      set({ creating: true });
      const res = await axiosInstance.post("/product/create", data);
      set((state) => ({ products: [res.data, ...state.products] }));
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to create product");
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
        selectedProduct:
          state.selectedProduct === id ? null : state.selectedProduct,
      }));
      toast.success("deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to delete product");
    }
  },

  updateProduct: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/product/update/${id}`, data);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? res.data : product,
        ),
        selectedProduct: null,
      }));
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to update product");
      return { success: false };
    }
  },

  getProduct: async (id) => {
    try {
      const res = await axiosInstance.get(`/product/${id}`);
      return { info: res.data };
    } catch (err) {
      toast.error(err.response?.data?.msg || "Unable to fetch product");
    }
  },
}));

export default useProduct;
