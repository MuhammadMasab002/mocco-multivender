// user routes
import express from "express";
import { registerShop } from "../controllers/shop.controller.js";

const shopRouter = express.Router();

shopRouter.post("/register", registerShop);
// shopRouter.post("/activate", activateShopEmail);
// shopRouter.post("/login", loginShop);
// shopRouter.get("/get-shop", isAuthenticated, getShop);
// shopRouter.get("/logout", isAuthenticated, logoutShop);

export default shopRouter;
