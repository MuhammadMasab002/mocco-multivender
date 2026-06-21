import express from "express";
import {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    clearWishlist,
    mergeWishlist,
} from "../controllers/wishlist.controller.js";
import isUserAuthenticated from "../middlewares/userAuth.js";

const wishlistRouter = express.Router();

// All wishlist routes require authentication
wishlistRouter.use(isUserAuthenticated);

wishlistRouter.get("/", getWishlist);
wishlistRouter.post("/", addToWishlist);
wishlistRouter.delete("/item/:productId", removeFromWishlist);
wishlistRouter.delete("/clear", clearWishlist);
wishlistRouter.post("/merge", mergeWishlist);

export default wishlistRouter;
