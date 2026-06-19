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

wishlistRouter.post("/", addToWishlist);
wishlistRouter.get("/", getWishlist);
wishlistRouter.delete("/:productId", removeFromWishlist);
wishlistRouter.delete("/", clearWishlist);
wishlistRouter.post("/merge", mergeWishlist);

export default wishlistRouter;
