import express from "express";
import { createProduct, deleteProduct, getShopProducts } from "../controllers/product.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import upload from "../../multer.js";

const productRouter = express.Router();

productRouter.post(
    "/create",
    isSellerAuthenticated,
    upload.array("files", 10),
    createProduct,
);
productRouter.get("/all", getShopProducts);
productRouter.get("/all/:shopId", getShopProducts);
productRouter.delete("/delete/:id", isSellerAuthenticated, deleteProduct);

export default productRouter;