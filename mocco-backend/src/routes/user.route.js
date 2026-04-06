// user routes
import express from "express";
import upload from "../../multer.js";
import {
  activateUserEmail,
  loginUser,
  registerUser,
  getUser,
  logoutUser
} from "../controllers/user.controller.js";
import isUserAuthenticated from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), registerUser);
userRouter.post("/activate", activateUserEmail);
userRouter.post("/login", loginUser);
userRouter.get("/get-user", isUserAuthenticated, getUser);
userRouter.get("/logout", isUserAuthenticated, logoutUser);

export default userRouter;
