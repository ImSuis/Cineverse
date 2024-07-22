import axios from 'axios';
import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:5001/api/bookings/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching bookings');
      }
    };

    fetchBookings();
  }, []);

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

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
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
    </div>
  );
}

export default UserBookings;
