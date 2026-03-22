// user routes
import express from "express";
import upload from "../../multer";
import { registerUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), registerUser);

export default userRouter;
