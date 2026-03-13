import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./src/config/.env" });
const app = express();

app.use(express.json());

// greeting route
app.get("/", (req, res) => {
  res.send("Welcome to Mocco Mart API");
});

export default app;
