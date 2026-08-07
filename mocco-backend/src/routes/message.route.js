import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/create-new-message", createMessage);
messageRouter.get("/get-all-messages/:id", getMessages);

export default messageRouter;
