import express from "express";
import { createEvent } from "../controllers/event.controller.js";
import isSellerAuthenticated from "../middlewares/sellerAuth.js";
import upload from "../../multer.js";

const eventRouter = express.Router();

eventRouter.post(
    "/create",
    isSellerAuthenticated,
    upload.array("files", 10),
    createEvent,
);

export default eventRouter;