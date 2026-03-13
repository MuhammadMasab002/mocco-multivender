import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "./src/config/.env" });
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

// greeting route
app.get("/", (req, res) => {
  res.json("Welcome to Mocco Mart Backend!");
});

export default app;
