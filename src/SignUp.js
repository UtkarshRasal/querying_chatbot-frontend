import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post("http://localhost:8000/query_chatbot/v1/api/auth/register", { username, password });
      navigate("/login");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
