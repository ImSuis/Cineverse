import React from 'react';

const SeatRow = ({ seats }) => {
  if (!seats) {
    // If seats is undefined or null, render nothing or a fallback UI
    return <div>No seats available</div>;
  }

  return (
    <div className="seat-row">
      {seats.map((seat, index) => (
        <div key={index} className="seat">
          {seat.label}
        </div>
      ))}
    </div>
  );
};

export default SeatRow;
