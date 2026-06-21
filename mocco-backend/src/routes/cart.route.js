import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    mergeCart,
} from "../controllers/cart.controller.js";
import isUserAuthenticated from "../middlewares/userAuth.js";

const cartRouter = express.Router();

cartRouter.use(isUserAuthenticated);

cartRouter.get("/", getCart);
cartRouter.post("/add", addToCart);
cartRouter.patch("/item/:productId", updateCartItem);
cartRouter.delete("/item/:productId", removeFromCart);
cartRouter.delete("/clear", clearCart);
cartRouter.post("/merge", mergeCart);

export default cartRouter;
