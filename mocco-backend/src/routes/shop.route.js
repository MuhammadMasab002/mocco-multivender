// user routes
import express from "express";
import { activateShopEmail, loginShop, registerShop } from "../controllers/shop.controller.js";
import upload from "../../multer.js";

const shopRouter = express.Router();

shopRouter.post("/register", upload.single("file"), registerShop);
shopRouter.post("/activate", activateShopEmail);
shopRouter.post("/login", loginShop);
// shopRouter.get("/get-shop", isAuthenticated, getShop);
// shopRouter.get("/logout", isAuthenticated, logoutShop);

export default shopRouter;
