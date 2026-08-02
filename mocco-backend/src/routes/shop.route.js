// user routes
import express from "express";
import {
  activateShopEmail,
  getSeller,
  getShopInfo,
  loginShop,
  logoutShop,
  registerShop,
  updateSellerInfo,
} from "../controllers/shop.controller.js";
import upload from "../../multer.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";

const shopRouter = express.Router();

shopRouter.post("/register", upload.single("file"), registerShop);
shopRouter.post("/activate", activateShopEmail);
shopRouter.post("/login", loginShop);
shopRouter.get("/seller", isSellerAuthenticated, getSeller);
shopRouter.get("/info/:shopId", getShopInfo);
shopRouter.get("/logout", isSellerAuthenticated, logoutShop);
shopRouter.put(
  "/update-seller-info",
  isSellerAuthenticated,
  upload.single("file"),
  updateSellerInfo,
);

export default shopRouter;
