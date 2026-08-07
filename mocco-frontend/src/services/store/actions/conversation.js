import axios from "axios";
import {
  getConversationsRequest,
  getConversationsSuccess,
  getConversationsFail,
  setActiveConversation,
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFail,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFail,
} from "../slices/conversationSlice";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create or find conversation
export const createConversation = (payload) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/conversation/create-new-conversation`,
      payload,
      { withCredentials: true }
    );

    if (data?.success && data?.conversation) {
      dispatch(setActiveConversation(data.conversation));
    }
    return { success: true, conversation: data?.conversation };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to create conversation";
    return { success: false, message };
  }
};

// Get seller conversations
export const getSellerConversations = (sellerId) => async (dispatch) => {
  try {
    dispatch(getConversationsRequest());

    const { data } = await axios.get(
      `${backendUrl}/conversation/get-all-seller-conversations/${sellerId}`,
      { withCredentials: true }
    );

    dispatch(getConversationsSuccess(data.conversations || []));
    return { success: true, conversations: data.conversations };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch seller conversations";

    dispatch(getConversationsFail(message));
    return { success: false, message };
  }
};

// Get user conversations
export const getUserConversations = (userId) => async (dispatch) => {
  try {
    dispatch(getConversationsRequest());

    const { data } = await axios.get(
      `${backendUrl}/conversation/get-all-user-conversations/${userId}`,
      { withCredentials: true }
    );

    dispatch(getConversationsSuccess(data.conversations || []));
    return { success: true, conversations: data.conversations };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch user conversations";

    dispatch(getConversationsFail(message));
    return { success: false, message };
  }
};

// Get messages for a conversation
export const getMessages = (conversationId) => async (dispatch) => {
  try {
    dispatch(getMessagesRequest());

    const { data } = await axios.get(
      `${backendUrl}/message/get-all-messages/${conversationId}`,
      { withCredentials: true }
    );

    dispatch(getMessagesSuccess(data.messages || []));
    return { success: true, messages: data.messages };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch messages";

    dispatch(getMessagesFail(message));
    return { success: false, message };
  }
};

// Send / Create a message
export const createMessage = (payload) => async (dispatch) => {
  try {
    dispatch(sendMessageRequest());

    const { data } = await axios.post(
      `${backendUrl}/message/create-new-message`,
      payload,
      { withCredentials: true }
    );

    if (data?.success && data?.message) {
      dispatch(sendMessageSuccess(data.message));
    }
    return { success: true, message: data?.message };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to send message";

    dispatch(sendMessageFail(message));
    return { success: false, message };
  }
};
