import express from "express";
import { createEvent, deleteEvent, getShopEvents, getAllEvents } from "../controllers/event.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import upload from "../../multer.js";

const eventRouter = express.Router();

eventRouter.post(
    "/create",
    isSellerAuthenticated,
    upload.array("files", 10),
    createEvent,
);
// global active events (homepage)
eventRouter.get("/all-events", getAllEvents);
// shop scoped events
eventRouter.get("/all/:shopId", getShopEvents);
eventRouter.delete("/delete/:id", isSellerAuthenticated, deleteEvent);

export default eventRouter;