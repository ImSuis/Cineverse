import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/seatSelection.css';
import Seat from './seat';

const SeatSelection = () => {
    const { scheduleId } = useParams();

    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({
        totalPrice: 0,
    });

    const numRows = 10;
    const numColumns = 12;
    const seatPrice = 310; // Example seat price, adjust as needed

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/seats/booking/${scheduleId}`);
                if (Array.isArray(response.data)) {
                    setSeats(response.data);
                } else {
                    setSeats([]);
                }
            } catch (error) {
                console.error('Error fetching seats:', error);
                setSeats([]);
            }
        };

        fetchSeats();
    }, [scheduleId]);

    const handleSeatClick = (row, column) => {
        const seatLabel = String.fromCharCode(64 + row) + column;
        const seatIndex = selectedSeats.findIndex(seat => seat.label === seatLabel);

        if (seatIndex === -1) {
            setSelectedSeats([...selectedSeats, { label: seatLabel, price: seatPrice }]);
            setBookingInfo({ ...bookingInfo, totalPrice: bookingInfo.totalPrice + seatPrice });
        } else {
            const updatedSeats = [...selectedSeats];
            updatedSeats.splice(seatIndex, 1);
            setSelectedSeats(updatedSeats);
            setBookingInfo({ ...bookingInfo, totalPrice: bookingInfo.totalPrice - seatPrice });
        }
    };

    const handleBooking = async () => {
        const seatIds = selectedSeats.map(seat => {
            const row = seat.label.charCodeAt(0) - 65 + 1;
            const column = parseInt(seat.label.slice(1), 10);
            const seatObj = seats.find(seat => seat.row === String.fromCharCode(64 + row) && seat.column === column);
            return seatObj.id;
        });

        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const response = await axios.post('http://localhost:5001/api/bookings/create', {
                scheduleId,
                seatIds,
                totalPrice: bookingInfo.totalPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the Authorization header
                }
            });

            if (response.status === 201) {
                alert('Booking created successfully!');
            } else {
                alert('Error creating booking.');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Error creating booking.');
        }
    };

    const renderSeats = () => {
        let seatRows = [];
        for (let row = 1; row <= numRows; row++) {
            let seatColumns = [];
            for (let column = 1; column <= numColumns; column++) {
                const seat = seats.find(seat => seat.row === String.fromCharCode(64 + row) && seat.column === column);
                const isBooked = seat && seat.isBooked;
                const isSelected = selectedSeats.some(selectedSeat => selectedSeat.label === String.fromCharCode(64 + row) + column);

                seatColumns.push(
                    <Seat
                        key={column}
                        isBooked={isBooked}
                        isSelected={isSelected}
                        onClick={() => handleSeatClick(row, column)}
                    />
                );
            }
            seatRows.push(
                <div key={row} className="seat-row">
                    <div className="label">{String.fromCharCode(64 + row)}</div>
                    {seatColumns}
                </div>
            );
        }
        return seatRows;
    };

    const renderColumnLabels = () => {
        let columnLabels = [];
        for (let column = 1; column <= numColumns; column++) {
            columnLabels.push(
                <div key={column} className="label">
                    {column}
                </div>
            );
        }
        return columnLabels;
    };

    return (
        <div className="seat-selection-container">
            <div className="seat-selection">
                <div className="screen">Screen</div>
                <div className="seat-rows-container">
                    <div className="column-labels">
                        <div className="label"></div>
                        {renderColumnLabels()}
                    </div>
                    {renderSeats()}
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <div className="legend-color available"></div>
                        <span>Available Seat</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color selected"></div>
                        <span>Selected Seat</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color booked"></div>
                        <span>Booked Seat</span>
                    </div>
                </div>
            </div>
            <div className="booking-info">
                <h2>Booking Information</h2>
                {selectedSeats.length === 0 ? (
                    <div className="empty-message">No seats selected</div>
                ) : (
                    selectedSeats.map(seat => (
                        <div key={seat.label} className="item">
                            <span>Seat {seat.label}</span>
                            <span className="price">Rs. {seat.price}</span>
                        </div>
                    ))
                )}
                <div className="total">
                    <span>Total Price:</span>
                    <span className="price">Rs. {bookingInfo.totalPrice}</span>
                </div>
                <button onClick={handleBooking}>Confirm Booking</button>
            </div>
        </div>
    );
};

export default SeatSelection;
