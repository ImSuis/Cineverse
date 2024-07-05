// Seat.js
import React from 'react';

const Seat = ({ isSelected, isBooked, onClick, type }) => {
    return (
        <div
            className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''} ${type}`}
            onClick={!isBooked ? onClick : null}
        ></div>
    );
};

export default Seat;


