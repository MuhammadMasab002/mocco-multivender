// user routes
import express from "express";
import upload from "../../multer.js";
import {
  activateUserEmail,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), registerUser);
userRouter.post("/activate", activateUserEmail);
userRouter.post("/login", loginUser);

export default userRouter;
