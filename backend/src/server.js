import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config({ quiet: true });
const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")),
  );
} else {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use("/api/auth", authRouter);
  app.use("/api/product", productRouter);
}

connectDB().then(() => {
  app.listen(process.env.port, () => {
    console.log("running on port ", process.env.port);
  });
});
