// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        setUser(JSON.parse(user));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const handleLoginModalClose = () => setShowLoginModal(false);
  const handleLoginModalShow = () => setShowLoginModal(true);

  const handleRegisterModalClose = () => setShowRegisterModal(false);
  const handleRegisterModalShow = () => setShowRegisterModal(true);

  return (
    <Router>
      <Main
        showLoginModal={showLoginModal}
        handleLoginModalShow={handleLoginModalShow}
        handleLoginModalClose={handleLoginModalClose}
        showRegisterModal={showRegisterModal}
        handleRegisterModalShow={handleRegisterModalShow}
        handleRegisterModalClose={handleRegisterModalClose}
        isLoggedIn={isLoggedIn}
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    </Router>
  );
}

export default App;
