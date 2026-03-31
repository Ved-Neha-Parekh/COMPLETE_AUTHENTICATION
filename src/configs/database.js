import mongoose from "mongoose";
import dotenv from "../configs/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(dotenv.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectDB;
