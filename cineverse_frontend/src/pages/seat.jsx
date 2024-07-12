import React from 'react';
import '../style/seat.css'; // Add appropriate styles

const Seat = ({ isBooked, isSelected, onClick }) => {
    return (
        <div
            className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={!isBooked ? onClick : null}
        >
        </div>
    );
};

export default Seat;
