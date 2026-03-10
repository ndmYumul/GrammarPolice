import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  conversations: [],
  activeConversation: null,
  isTyping: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateConversation: (state, action) => {
      const index = state.conversations.findIndex(
        (conv) => conv.id === action.payload.id,
      );
      if (index !== -1) {
        state.conversations[index] = action.payload;
      }
    },
    deleteConversation: (state, action) => {
      state.conversations = state.conversations.filter(
        (conv) => conv.id !== action.payload,
      );
    },
    setChatError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addMessage,
  setMessages,
  clearMessages,
  setIsTyping,
  addConversation,
  setActiveConversation,
  updateConversation,
  deleteConversation,
  setChatError,
} = chatSlice.actions;

export default chatSlice.reducer;
