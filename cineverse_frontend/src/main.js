// src/Main.js

import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/navbar";
import LoginModal from "./component/loginModal";
import RegisterModal from "./component/registerModal";
import Homepage from "./pages/homepage";
import Movie from "./pages/movie";
import SeatSelection from "./pages/seatSelection";
import { ToastContainer } from "react-toastify";
import AdminRoutes from "./protected/adminRoutes";
import AdminDashboard from "./pages/admin/adminDashboard";
import ManageMovies from "./pages/admin/manageMovies";
import AddMovie from "./pages/admin/addMovie";
import ManageLocations from "./pages/admin/manageLocations";

const Main = ({
  showLoginModal,
  handleLoginModalShow,
  handleLoginModalClose,
  showRegisterModal,
  handleRegisterModalShow,
  handleRegisterModalClose,
  isLoggedIn,
  user,
  setIsLoggedIn,
  setUser
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <Navbar
          handleLoginModalShow={handleLoginModalShow}
          handleRegisterModalShow={handleRegisterModalShow}
          isLoggedIn={isLoggedIn}
          user={user}
        />
      )}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route element={<AdminRoutes />}>
            
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
          <Route path="/admin/movies/add" element={<AddMovie />} />
          <Route path="/admin/locations" element={<ManageLocations />} />
          {/* <Route path="/admin/edit/:id" element={<AdminEdit />} /> */}
        </Route>
      </Routes>
      <LoginModal
        show={showLoginModal}
        handleClose={handleLoginModalClose}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
      <RegisterModal show={showRegisterModal} handleClose={handleRegisterModalClose} />
    </>
  );
};

export default Main;
