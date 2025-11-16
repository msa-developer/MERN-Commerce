import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(403).json({ msg: "No Token Exists" });

    const decode = jwt.verify(token, process.env.jwt_secret);
    if (!decode) return res.status(403).json({ msg: "Token Not Valid" });

    const user = await User.findById(decode.userId).select("-password");

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticateUser;
