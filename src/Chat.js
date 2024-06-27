import React, { useState } from "react";
import axios from "axios";
import './Chat.css';

const Chat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;


    const userMessage = { message: input };
    setMessages([...messages, { user: "user", text: input }]);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/query_chatbot/v1/api/chat/messages", userMessage, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
      });
      let _response = await response.data
      setMessages([...messages, { user: "user", text: input }, { user: "bot", text: _response.botResponse.response.reply }]);
    } catch (error) {
      console.error("Chat failed:", error);
    }
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
};

export default Chat;
