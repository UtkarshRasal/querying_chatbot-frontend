// src/App.js
import React, { useState } from "react";
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcm5hbWUiOiJ1dGthcnNocmFzYWwiLCJpZCI6IjY2N2M2ZjRkMjFlYjliMmIzM2RhOGY5YSJ9LCJleHAiOjE3MTk1MTgwNzh9.9YpuWQ-saBrR6ajbdZfb3G5D9BKaew-IKDTGYc3zDQk"; // Replace with actual token logic

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input };
    setMessages([...messages, { user: "user", text: input }]);
    setInput("");

    const response = await fetch("http://localhost:8000/query_chatbot/v1/api/chat/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userMessage)
    });

    const data = await response.json();
    setMessages([...messages, { user: "user", text: input }, { user: "bot", text: data.botResponse.response.reply }]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chatbot</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            <div className="text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-input"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}

export default App;
