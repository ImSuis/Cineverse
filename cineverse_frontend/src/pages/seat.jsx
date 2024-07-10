import React from 'react';
import Seat from './seat';

const SeatRow = ({ rowIndex, seats, onSeatClick }) => {
    return (
        <div className="seat-row">
            {seats.map((seat, seatIndex) => (
                <Seat
                    key={`seat-${seat.id}`}
                    isSelected={seat.isSelected}
                    isBooked={seat.isBooked}
                    onClick={() => onSeatClick(rowIndex, seatIndex)}
                />
            ))}
        </div>
    );
};

export default SeatRow;
