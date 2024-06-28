import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('access_token')) {
      navigate('/chat')
    }
  })

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/query_chatbot/v1/api/auth/login", { username, password });
      let _response = await response.data

      setToken(_response.user.access_token);

    //   localStorage.setItem('access_token', _response.user.access_token)
      navigate("/chat");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
