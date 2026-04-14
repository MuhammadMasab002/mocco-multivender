import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./src/routes/user.route.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import connectDB from "./src/db/index.js";
import shopRouter from "./src/routes/shop.route.js";
import productRouter from "./src/routes/product.router.js";

const app = express();
const isProduction =
  process.env.VERCEL === "1" ||
  String(process.env.NODE_ENV || "").toLowerCase() === "production";

// config
if (!isProduction) {
  dotenv.config({ path: "./src/config/.env" });
}

const normalizeOrigin = (origin) =>
  typeof origin === "string" ? origin.replace(/\/+$/, "") : origin;

const allowedOrigins = new Set(
  [
    "http://localhost:5173",
    "https://mocco-mart.vercel.app",
    process.env.FRONTEND_URL,
  ]
    .filter(Boolean)
    .map(normalizeOrigin),
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

// greeting route
app.get("/", (req, res) => {
  res.json("Welcome to Mocco Mart Backend!");
});

// Ensure DB is connected in serverless environments (e.g. Vercel app.js entrypoint)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/product", productRouter);
app.use(errorMiddleware);

export default app;
