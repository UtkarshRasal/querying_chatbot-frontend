import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Chat from "./Chat";
import Navbar from "./Navbar";
import './App.css';

function App() {
  // const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("access_token") || "" );
  useEffect(()=>{
    localStorage.setItem('access_token', token)
  }, [token])

  useEffect(()=> {
    if(token) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/chat" element={<Chat token={token} />} />
          <Route path="/" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
