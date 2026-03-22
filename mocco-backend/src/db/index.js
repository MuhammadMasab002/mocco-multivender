import dotenv from "dotenv";
import mongoose from "mongoose";

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./src/config/.env" });
}

const DB_NAME = process.env.DB_NAME || "mocco_db";
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, { dbName: DB_NAME });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
