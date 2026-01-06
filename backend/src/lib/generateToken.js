import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const secret = process.env.JWT_SECRET || process.env.jwt_secret;

  if (!secret) throw new Error("JWT secret missing");

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  return token;
};

export default generateToken;
