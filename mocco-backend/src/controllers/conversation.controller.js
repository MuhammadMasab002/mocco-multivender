import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import Shop from "../models/shop.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Create or get existing conversation
const createConversation = async (req, res, next) => {
  try {
    const { userId, sellerId, groupTitle } = req.body || {};

    if (!userId || !sellerId) {
      return next(new ErrorHandler("userId and sellerId are required!", 400));
    }

    // Check if conversation already exists between these two members
    const isConversationExist = await Conversation.findOne({
      members: {
        $all: [userId, sellerId],
      },
    });

    if (isConversationExist) {
      return res.status(200).json({
        success: true,
        conversation: isConversationExist,
      });
    }

    // Create new conversation
    const conversation = await Conversation.create({
      groupTitle: groupTitle || `${userId}_${sellerId}`,
      members: [userId, sellerId],
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Error in createConversation:", error);
    return next(
      new ErrorHandler("Failed to create conversation! " + error.message, 500)
    );
  }
};

// Get seller conversations
const getSellerConversations = async (req, res, next) => {
  try {
    const sellerId = req.params.id || req.seller?._id;

    if (!sellerId) {
      return next(new ErrorHandler("Seller ID is required!", 400));
    }

    const rawConversations = await Conversation.find({
      members: {
        $in: [sellerId],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    // Enrich conversations with customer (user) profile details
    const enrichedConversations = await Promise.all(
      rawConversations.map(async (conv) => {
        const convObj = conv.toObject();
        const customerId = convObj.members.find((m) => String(m) !== String(sellerId));

        if (customerId) {
          try {
            const customer = await User.findById(customerId).select(
              "name email avatar phoneNumber"
            );
            convObj.user = customer || null;
          } catch (e) {
            convObj.user = null;
          }
        }
        return convObj;
      })
    );

    res.status(200).json({
      success: true,
      conversations: enrichedConversations,
    });
  } catch (error) {
    console.error("Error in getSellerConversations:", error);
    return next(
      new ErrorHandler("Failed to fetch seller conversations! " + error.message, 500)
    );
  }
};

// Get user conversations
const getUserConversations = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("User ID is required!", 400));
    }

    const rawConversations = await Conversation.find({
      members: {
        $in: [userId],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    // Enrich conversations with seller (shop) details
    const enrichedConversations = await Promise.all(
      rawConversations.map(async (conv) => {
        const convObj = conv.toObject();
        const shopId = convObj.members.find((m) => String(m) !== String(userId));

        if (shopId) {
          try {
            const shop = await Shop.findById(shopId).select(
              "name email avatar phoneNumber description"
            );
            convObj.seller = shop || null;
          } catch (e) {
            convObj.seller = null;
          }
        }
        return convObj;
      })
    );

    res.status(200).json({
      success: true,
      conversations: enrichedConversations,
    });
  } catch (error) {
    console.error("Error in getUserConversations:", error);
    return next(
      new ErrorHandler("Failed to fetch user conversations! " + error.message, 500)
    );
  }
};

export {
  createConversation,
  getSellerConversations,
  getUserConversations,
};
