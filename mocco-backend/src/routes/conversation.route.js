import express from "express";
import {
  createConversation,
  getSellerConversations,
  getUserConversations,
} from "../controllers/conversation.controller.js";

const conversationRouter = express.Router();

conversationRouter.post("/create-new-conversation", createConversation);
conversationRouter.get(
  "/get-all-seller-conversations/:id",
  getSellerConversations
);
conversationRouter.get(
  "/get-all-user-conversations/:id",
  getUserConversations
);

export default conversationRouter;
