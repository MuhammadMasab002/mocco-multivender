// user routes
import express from "express";
import { activateShopEmail, getSeller, loginShop, logoutShop, registerShop } from "../controllers/shop.controller.js";
import upload from "../../multer.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";

const shopRouter = express.Router();

shopRouter.post("/register", upload.single("file"), registerShop);
shopRouter.post("/activate", activateShopEmail);
shopRouter.post("/login", loginShop);
shopRouter.get("/get-seller", isSellerAuthenticated, getSeller);
shopRouter.get("/logout", isSellerAuthenticated, logoutShop);

export default shopRouter;
