import express from "express";
import { createEvent, getShopEvents } from "../controllers/event.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import upload from "../../multer.js";

const eventRouter = express.Router();

eventRouter.post(
    "/create",
    isSellerAuthenticated,
    upload.array("files", 10),
    createEvent,
);
// eventRouter.get("/all", getShopEvents);
eventRouter.get("/all/:shopId", getShopEvents);

export default eventRouter;