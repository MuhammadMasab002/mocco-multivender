import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getBestSellingProducts,
    getProductById,
    getShopProducts,
    toggleFeatured,
} from "../controllers/product.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import upload from "../../multer.js";

const productRouter = express.Router();

productRouter.post(
    "/create",
    isSellerAuthenticated,
    upload.array("files", 10),
    createProduct,
);

productRouter.get("/all", getAllProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/best-selling", getBestSellingProducts);
productRouter.get("/detail/:id", getProductById);
productRouter.get("/all/:shopId", getShopProducts);

productRouter.patch("/toggle-featured/:id", isSellerAuthenticated, toggleFeatured);
productRouter.delete("/delete/:id", isSellerAuthenticated, deleteProduct);

export default productRouter;