import React, { useEffect, useState } from 'react';
import '../style/profile.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import QRCode from 'qrcode.react';

function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage or context
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}` // Add the authorization header
          }
        });
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          mobile: '' // Assuming you don't have this in the response
        });
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage or context
        const response = await axios.get('http://localhost:5001/api/bookings/user', {
          headers: {
            Authorization: `Bearer ${token}` // Add the authorization header
          }
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching bookings');
      }
    };

    fetchUserDetails();
    fetchBookings();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save changes)
  };

  const groupedBookings = bookings.reduce((acc, booking) => {
    const { ScheduleId, Schedule, Seat } = booking;
    const seatLabel = `${Seat.row}${Seat.column}`;

    if (!acc[ScheduleId]) {
      acc[ScheduleId] = {
        ...Schedule,
        seats: [seatLabel]
      };
    } else {
      acc[ScheduleId].seats.push(seatLabel);
    }
    return acc;
  }, {});

  const bookingRows = Object.values(groupedBookings);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <button
          className={`profile-sidebar-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => handleTabChange('account')}
        >
          Account Details
        </button>
        <button
          className={`profile-sidebar-button ${activeTab === 'tickets' ? 'active' : ''}`}
          onClick={() => handleTabChange('tickets')}
        >
          Ticket
        </button>
      </div>
      <div className="profile-content">
        {error && <div className="error-message">{error}</div>}
        {activeTab === 'account' ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form-buttons">
              <button type="button" className="profile-btn profile-change-password">Change Password</button>
              <button type="submit" className="profile-btn profile-save-changes">Save Changes</button>
            </div>
          </form>
        ) : (
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Movie Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Seats</th>
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {bookingRows.map((booking, index) => (
                <tr key={index}>
                  <td className="align-middle">{booking.Movie.title}</td>
                  <td className="align-middle">{booking.date}</td>
                  <td className="align-middle">{booking.Showtime.time}</td>
                  <td className="align-middle">{booking.seats.join(', ')}</td>
                  <td className="align-middle">
                    <QRCode value={`${booking.Movie.title}, ${booking.date}, ${booking.Showtime.time}, Seats: ${booking.seats.join(', ')}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Profile;
