import express from "express";
import { createProduct, getShopProducts } from "../controllers/product.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import upload from "../../multer.js";

const productRouter = express.Router();

productRouter.post(
    "/create",
    isSellerAuthenticated,
    upload.array("files", 10),
    createProduct,
);
productRouter.get("/all", isSellerAuthenticated, getShopProducts);

export default productRouter;