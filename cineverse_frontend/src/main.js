import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
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
import Footer from "./component/footer";
import Profile from "./pages/profile";
import FAQ from "./pages/faq";

const Main = ({
  showLoginModal,
  handleLoginModalShow,
  handleLoginModalClose,
  showRegisterModal,
  handleRegisterModalShow,
  handleRegisterModalClose,
}) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5001/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

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
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/faq" element={<FAQ />} />
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
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default Main;
