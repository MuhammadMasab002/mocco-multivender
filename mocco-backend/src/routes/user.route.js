// user routes
import express from "express";
import upload from "../../multer.js";
import {
  activateUserEmail,
  loginUser,
  registerUser,
  getUser,
  logoutUser,
  updateProfile,
  updatePassword,
  addAddress,
  deleteAddress
} from "../controllers/user.controller.js";
import isUserAuthenticated from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), registerUser);
userRouter.post("/activate", activateUserEmail);
userRouter.post("/login", loginUser);
userRouter.get("/", isUserAuthenticated, getUser);
userRouter.get("/logout", isUserAuthenticated, logoutUser);

// Profile routes
userRouter.put("/update-profile", isUserAuthenticated, upload.single("file"), updateProfile);
userRouter.put("/update-password", isUserAuthenticated, updatePassword);
userRouter.post("/add-address", isUserAuthenticated, addAddress);
userRouter.delete("/delete-address/:id", isUserAuthenticated, deleteAddress);

export default userRouter;
