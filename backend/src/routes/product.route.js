import express from "express";
import {
  Create,
  Del,
  getAllProducts,
  getById,
  Update,
} from "../controller/product.contorller.js";
import authenticateUser from "../lib/auth.middleware.js";

const productRouter = express.Router();

productRouter.use(authenticateUser);

productRouter.get("/products", getAllProducts);
productRouter.post("/create", Create);
productRouter.delete("/delete/:id", Del);
productRouter.get("/:id", getById);
productRouter.put("/update/:id", Update);

export default productRouter;
