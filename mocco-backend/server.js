// IMPORTANT: dotenv must be configured FIRST before importing any other
// modules that may read process.env at load time (e.g. payment controller).
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import connectDB from "./src/db/index.js";

const port = process.env.PORT || 8000;

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

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
