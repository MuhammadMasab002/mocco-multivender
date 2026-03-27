// user routes
import express from "express";
import upload from "../../multer.js";
import {
  activateUserEmail,
  loginUser,
  registerUser,
  getUser
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), registerUser);
userRouter.post("/activate", activateUserEmail);
userRouter.post("/login", loginUser);
userRouter.get("/get-user", isAuthenticated, getUser);

export default userRouter;
