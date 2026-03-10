import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setIsTyping,
  clearMessages,
} from "../redux/slices/chatSlice";
import { logout } from "../redux/slices/authSlice";
import Message from "../components/Message";
import EmptyState from "../components/EmptyState";
import "./HomeScreen.css";

function HomeScreen() {
  const dispatch = useDispatch();
  const { messages, isTyping } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    dispatch(addMessage(userMessage));
    setInputMessage("");
    dispatch(setIsTyping(true));

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: "I'm a demo AI assistant. In a real application, I would process your message and provide a meaningful response!",
        sender: "ai",
        timestamp: new Date(),
      };
      dispatch(addMessage(aiMessage));
      dispatch(setIsTyping(false));
    }, 1500);
  };

  const handleLogout = () => {
    dispatch(clearMessages());
    dispatch(logout());
  };

  return (
    <div className="home-container">
      <div className="chat-wrapper">
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="header-title">
              <h2>AI Chat Assistant</h2>
              <span className="status-indicator">● Online</span>
            </div>
            <div className="header-actions">
              {user && <span className="user-name">Welcome, {user.name}!</span>}
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  isUser={message.sender === "user"}
                />
              ))}

              {isTyping && (
                <div className="message ai-message">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="input-container">
          <form onSubmit={handleSendMessage} className="input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputMessage.trim() || isTyping}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
