import dotenv from "dotenv";
import mongoose from "mongoose";

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./src/config/.env" });
}

const DB_NAME = process.env.DB_NAME || "moco-mart";
const DATABASE_URL = process.env.DATABASE_URL;

let cachedConnectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnectionPromise) {
    await cachedConnectionPromise;
    return mongoose.connection;
  }

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  try {
    cachedConnectionPromise = mongoose.connect(DATABASE_URL, {
      dbName: DB_NAME,
      serverSelectionTimeoutMS: 10000,
    });
    await cachedConnectionPromise;
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    cachedConnectionPromise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
