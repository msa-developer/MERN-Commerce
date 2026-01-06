import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI)
      throw new Error("MONGODB_URI is not defined in environment variables");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
