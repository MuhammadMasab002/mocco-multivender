import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  activeConversation: null,
  messages: [],
  conversationsLoading: false,
  messagesLoading: false,
  sendLoading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    // Conversations loading
    getConversationsRequest: (state) => {
      state.conversationsLoading = true;
      state.error = null;
    },
    getConversationsSuccess: (state, action) => {
      state.conversationsLoading = false;
      state.conversations = action.payload;
    },
    getConversationsFail: (state, action) => {
      state.conversationsLoading = false;
      state.error = action.payload;
    },

    // Active conversation
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },

    // Messages loading
    getMessagesRequest: (state) => {
      state.messagesLoading = true;
      state.error = null;
    },
    getMessagesSuccess: (state, action) => {
      state.messagesLoading = false;
      state.messages = action.payload;
    },
    getMessagesFail: (state, action) => {
      state.messagesLoading = false;
      state.error = action.payload;
    },

    // Create message
    sendMessageRequest: (state) => {
      state.sendLoading = true;
    },
    sendMessageSuccess: (state, action) => {
      state.sendLoading = false;
      state.messages.push(action.payload);

      // Update last message in current conversation list
      if (state.activeConversation && action.payload.conversationId === state.activeConversation._id) {
        state.activeConversation.lastMessage = action.payload.text;
      }

      const convIndex = state.conversations.findIndex(
        (c) => c._id === action.payload.conversationId
      );
      if (convIndex !== -1) {
        state.conversations[convIndex].lastMessage = action.payload.text;
        state.conversations[convIndex].updatedAt = new Date().toISOString();
      }
    },
    sendMessageFail: (state, action) => {
      state.sendLoading = false;
      state.error = action.payload;
    },

    clearConversationErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
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
  clearConversationErrors,
} = conversationSlice.actions;

export default conversationSlice.reducer;
