import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully.");
} catch (error) {
  console.error("Unable to connect to MongoDB:", error);
  process.exit(1);
}
