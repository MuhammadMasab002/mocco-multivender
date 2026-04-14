import express from "express";
import { createProduct } from "../controllers/product.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import upload from "../../multer.js";

const productRouter = express.Router();

productRouter.post(
    "/create",
    isSellerAuthenticated,
    upload.array("files", 10),
    createProduct,
);

export default productRouter;