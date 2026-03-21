import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";

const port = process.env.PORT || 8000;

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  console.log("Running in development mode");
  dotenv.config({ path: "./src/config/.env" });
} else {
  console.log("Running in production mode");
}

// start server after connecting to database
let server;
connectDB().then(() => {
  // create server
  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

// handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
