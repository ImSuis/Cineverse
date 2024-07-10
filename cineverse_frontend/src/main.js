// src/Main.js

import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginModal from "./component/loginModal";
import Navbar from "./component/navbar";
import RegisterModal from "./component/registerModal";
import AddLocation from "./pages/admin/addLocations";
import AddMovie from "./pages/admin/addMovie";
import AdminDashboard from "./pages/admin/adminDashboard";
import ManageLocations from "./pages/admin/manageLocations";
import ManageMovies from "./pages/admin/manageMovies";
import Homepage from "./pages/homepage";
import Movie from "./pages/movie";
import SeatSelection from "./pages/seatSelection";
import AdminRoutes from "./protected/adminRoutes";
import ManageShowtimes from "./pages/admin/manageShowtimes";
import AddShowtime from "./pages/admin/addShowtimes";
import ManageSchedules from "./pages/admin/manageSchedule";
import AddSchedule from "./pages/admin/addSchedule";

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
  setUser,
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
        <Route path="/seat-selection/:scheduleId" element={<SeatSelection />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/movies" element={<ManageMovies />} />
          <Route path="/admin/movies/add" element={<AddMovie />} />
          <Route path="/admin/locations" element={<ManageLocations />} />
          <Route path="/admin/locations/add" element={<AddLocation />} />
          <Route path="/admin/showtimes" element={<ManageShowtimes />} />
          <Route path="/admin/showtimes/add" element={<AddShowtime />} />
          <Route path="/admin/schedules" element={<ManageSchedules />} />
          <Route path="/admin/schedules/add" element={<AddSchedule />} />
          {/* <Route path="/admin/edit/:id" element={<AdminEdit />} /> */}
        </Route>
      </Routes>
      <LoginModal
        show={showLoginModal}
        handleClose={handleLoginModalClose}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
      <RegisterModal
        show={showRegisterModal}
        handleClose={handleRegisterModalClose}
      />
    </>
  );
};

export default Main;
