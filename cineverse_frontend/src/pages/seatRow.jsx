import React from 'react';
import Seat from './seat';

const SeatRow = ({ rowIndex, seats, onSeatClick }) => {
    return (
        <div className="seat-row">
            {seats.map((seat, seatIndex) => (
                <Seat
                    key={`seat-${rowIndex}-${seatIndex}`}
                    isSelected={seat.isSelected}
                    isBooked={seat.isBooked}
                    type={seat.type}
                    onClick={() => onSeatClick(rowIndex, seatIndex)}
                />
            ))}
        </div>
    );
};

export default SeatRow;
