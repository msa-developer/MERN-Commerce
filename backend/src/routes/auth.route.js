import express from "express";
import { Login, Logout, Register } from "../controller/auth.controller.js";
import authenticateUser from "../lib/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);
authRouter.get("/check", authenticateUser, (req, res) =>
  res.status(200).json(req.user),
);

export default authRouter;
