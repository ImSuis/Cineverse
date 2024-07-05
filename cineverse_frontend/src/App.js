// src/App.js

import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./component/navbar";
import LoginModal from "./component/loginModal";
import RegisterModal from "./component/registerModal";
import Homepage from "./pages/homepage";
import Movie from "./pages/movie";
import SeatSelection from "./pages/seatSelection";
import { ToastContainer } from "react-toastify";

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
      <Navbar
        handleLoginModalShow={handleLoginModalShow}
        handleRegisterModalShow={handleRegisterModalShow}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/movie/:id" element={<Movie />} />

      </Routes>
      <LoginModal
        show={showLoginModal}
        handleClose={handleLoginModalClose}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
      <RegisterModal show={showRegisterModal} handleClose={handleRegisterModalClose} />
    </Router>
  );
}

export default App;