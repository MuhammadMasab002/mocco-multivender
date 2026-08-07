import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Create new message
const createMessage = async (req, res, next) => {
  try {
    const { conversationId, sender, text, images } = req.body || {};

    if (!conversationId || !sender || (!text && !images)) {
      return next(
        new ErrorHandler("conversationId, sender, and text/images are required!", 400)
      );
    }

    const message = new Message({
      conversationId,
      sender,
      text: text || "",
      images: images || null,
    });

    await message.save();

    // Update conversation lastMessage, lastMessageId, and timestamp
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text || "Sent an attachment",
      lastMessageId: message._id,
      updatedAt: Date.now(),
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error in createMessage:", error);
    return next(
      new ErrorHandler("Failed to create message! " + error.message, 500)
    );
  }
};

// Get all messages for a conversation
const getMessages = async (req, res, next) => {
  try {
    const conversationId = req.params.id;

    if (!conversationId) {
      return next(new ErrorHandler("Conversation ID is required!", 400));
    }

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    return next(
      new ErrorHandler("Failed to fetch messages! " + error.message, 500)
    );
  }
};

export { createMessage, getMessages };
