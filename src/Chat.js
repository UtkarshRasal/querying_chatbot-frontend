import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Chat.css';

const Chat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('access_token') == null || localStorage.getItem('access_token') === '') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input };
    setMessages([...messages, { user: "user", text: input }, { user: "bot", isLoading: true }]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:8000/query_chatbot/v1/api/chat/messages", userMessage, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` }
      });
      const _response = await response.data;
      const newMessages = messages.filter(msg => !msg.isLoading); // Remove the loading message
      setMessages([...newMessages, { user: "user", text: input }, { user: "bot", text: _response.botResponse.response.reply, engineers: _response.engineers }]);
    } catch (error) {
      console.error("Chat failed:", error);
      setMessages(messages.filter(msg => !msg.isLoading)); // Remove the loading message in case of error
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
            {msg.isLoading ? (
              <div className="dot-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            ) : msg.engineers && msg.engineers.length ? (
              <div className="chat-body-card">
                <div className="text">{msg.text}</div>
                {msg.engineers.map((e, i) => (
                  <div className="card-container" key={i}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text"><strong>Name:</strong> {e.name}</p>
                        <p className="card-text"><strong>Email:</strong> {JSON.parse(e.email)[0]}</p>
                        <p className="card-text"><strong>Full time status:</strong> {e.fullTimeStatus}</p>
                        <p className="card-text"><strong>Work Availability:</strong> {e.workAvailability}</p>
                        <p className="card-text"><strong>Full Time Salary:</strong> {e.fullTimeSalary} {e.fullTimeSalaryCurrency}</p>
                        <p className="card-text"><strong>Part Time Salary:</strong> {e.partTimeSalary} {e.partTimeSalaryCurrency}</p>
                        <p className="card-text"><strong>Preferred Role:</strong> {e.preferredRole}</p>
                        <p className="card-text"><strong>Work Experience:</strong> {e.WorkExperience}</p>
                        <p className="card-text"><strong>Education:</strong> {e.Education}</p>
                        <p className="card-text"><strong>Skills:</strong> {e.Skills}</p>
                        <p className="card-text"><strong>City:</strong> {JSON.parse(e.location).city}</p>
                        <p className="card-text"><strong>Country:</strong> {JSON.parse(e.location).country}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text">{msg.text}</div>
            )}
          </div>
        ))}
        <div ref={chatContainerRef} />
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
