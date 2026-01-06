import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ msg: "No Token Exists" });

    const secret = process.env.JWT_SECRET || process.env.jwt_secret;
    if (!secret) return res.status(500).json({ msg: "JWT secret missing" });

    const decode = jwt.verify(token, secret);
    if (!decode) return res.status(401).json({ msg: "Token Not Valid" });

    const user = await User.findById(decode.userId).select("-password");
    if (!user) return res.status(401).json({ msg: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token Not Valid" });
  }
};

export default authenticateUser;
