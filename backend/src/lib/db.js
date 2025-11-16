import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.mongodb).then(() => {
      console.log("connected to mongodb");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
