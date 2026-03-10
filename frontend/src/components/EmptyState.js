import React from "react";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">🤖</div>
        <h2 className="empty-state-title">Welcome to AI Chat!</h2>
        <p className="empty-state-description">
          Start a conversation with our AI assistant. Ask questions, get help,
          or just chat about anything you'd like.
        </p>
        <div className="empty-state-suggestions">
          <p className="suggestions-label">Try asking:</p>
          <div className="suggestion-items">
            <div className="suggestion-item">💡 "How can you help me?"</div>
            <div className="suggestion-item">📝 "Help me write something"</div>
            <div className="suggestion-item">🔍 "Explain a concept to me"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
