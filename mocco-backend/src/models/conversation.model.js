import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    groupTitle: {
      type: String,
    },
    members: {
      type: Array,
      required: true,
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
