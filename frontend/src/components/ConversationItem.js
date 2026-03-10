import React from "react";
import "./ConversationItem.css";

function ConversationItem({ conversation, isActive, onClick }) {
  const formatDate = (date) => {
    const convDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (convDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (convDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return convDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div
      className={`conversation-item ${isActive ? "active" : ""}`}
      onClick={() => onClick(conversation)}
    >
      <div className="conversation-icon">💬</div>
      <div className="conversation-details">
        <div className="conversation-title">{conversation.title}</div>
        <div className="conversation-preview">{conversation.lastMessage}</div>
      </div>
      <div className="conversation-meta">
        <div className="conversation-date">{formatDate(conversation.date)}</div>
        {conversation.unread > 0 && (
          <div className="conversation-unread">{conversation.unread}</div>
        )}
      </div>
    </div>
  );
}

export default ConversationItem;
