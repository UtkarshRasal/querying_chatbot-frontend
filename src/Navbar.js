import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Check if the user is logged in (for example, by checking a token in localStorage)
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/login')
  };
  console.log({isLoggedIn})
  return (
    <div className="navbar">
      <div className="navbar-brand">Chatbot App</div>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <a href="/login" className="navbar-link">Login</a>
            <a href="/signup" className="navbar-link">Signup</a>
          </>
        ) : (
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
