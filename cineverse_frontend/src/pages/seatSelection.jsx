import React, { useState } from 'react';
import '../style/seatSelection.css';
import SeatRow from './seatRow';

const SeatSelection = () => {
    const numRows = 10;
    const numCols = 12;

    const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, numRows);
    const colLabels = Array.from({ length: numCols }, (_, i) => i + 1);

    const initialSeats = Array.from({ length: numRows }, () =>
        Array(numCols).fill(null).map(() => ({
            isSelected: false,
            isBooked: Math.random() > 0.7,
            type: 'standard',
        }))
    );

    const [seats, setSeats] = useState(initialSeats);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (rowIndex, seatIndex) => {
        const updatedSeats = seats.map((row, rIdx) =>
            row.map((seat, sIdx) => {
                if (rIdx === rowIndex && sIdx === seatIndex) {
                    if (seat.isBooked) return seat;
                    return { ...seat, isSelected: !seat.isSelected };
                }
                return seat;
            })
        );
        setSeats(updatedSeats);

        const selected = updatedSeats[rowIndex][seatIndex].isSelected;
        if (selected) {
            setSelectedSeats([...selectedSeats, { row: rowIndex, col: seatIndex }]);
        } else {
            setSelectedSeats(selectedSeats.filter(seat => seat.row !== rowIndex || seat.col !== seatIndex));
        }
    };

    const getTotalPrice = () => {
        return selectedSeats.length * 10; // Assume each seat costs $10
    };

    return (
        <div className="seat-selection-container">
            <div className="seat-selection">
                <div className="screen">SCREEN</div>
                <div className="seat-rows-container">
                    <div className="column-labels">
                        <div className="label"></div> {/* Empty top-left corner */}
                        {colLabels.map((label, index) => (
                            <div key={index} className="label">{label}</div>
                        ))}
                    </div>
                    {seats.map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} className="seat-row">
                            <div className="label">{rowLabels[rowIndex]}</div>
                            <SeatRow
                                rowIndex={rowIndex}
                                seats={row}
                                onSeatClick={handleSeatClick}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="booking-info" style={{ minHeight: selectedSeats.length ? 'auto' : '200px' }}>
                <h2>Booking Information</h2>
                {selectedSeats.length === 0 ? (
                    <div className="empty-message">Please select a seat</div>
                ) : (
                    <>
                        {selectedSeats.map((seat, index) => (
                            <div key={index} className="item">
                                <span>{`Seat: ${rowLabels[seat.row]}${colLabels[seat.col]}`}</span>
                                <span className="price">$10.00</span>
                            </div>
                        ))}
                        <div className="total">
                            <span>Total</span>
                            <span>${getTotalPrice()}</span>
                        </div>
                        <div className="discount-code">
                            <input type="text" placeholder="Enter Discount Code" />
                        </div>
                        <button>Proceed to checkout</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SeatSelection;
