import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/confirmation.css';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, bookingInfo, scheduleId, seats } = location.state;
    const [khaltiId, setKhaltiId] = useState('');
    const [khaltiPin, setKhaltiPin] = useState('');

    const handlePayment = async () => {
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
                khaltiId,
                khaltiPin
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the Authorization header
                }
            });

            if (response.status === 201) {
                toast.success("Booking created successfully!");
                navigate('/');
            } else {
                toast.error("Error creating booking.");
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error("Error creating booking.");
        }
    };

    const handleCancel = () => {
        navigate('/seat-selection');
    };

    return (
        <div className="confirmation-container">
            <div className="payment-details">
                <h2>Payment Details</h2>
                <p>Billed to:</p>
                <p>Test User</p>
                <p>test@email.com</p>
                <p>Amount Summary:</p>
                <div className="total-amount">
                    <span>Total Amount</span>
                    <span>Rs. {bookingInfo.totalPrice}</span>
                </div>
            </div>
            <div className="payment-form">
                <div className="input-group">
                    <label htmlFor="khaltiId">Khalti ID</label>
                    <input
                        type="text"
                        id="khaltiId"
                        value={khaltiId}
                        onChange={(e) => setKhaltiId(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="khaltiPin">Khalti PIN</label>
                    <input
                        type="password"
                        id="khaltiPin"
                        value={khaltiPin}
                        onChange={(e) => setKhaltiPin(e.target.value)}
                    />
                </div>
                <div className="button-group">
                    <button className="confirm-button" onClick={handlePayment}>Confirm Payment</button>
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
