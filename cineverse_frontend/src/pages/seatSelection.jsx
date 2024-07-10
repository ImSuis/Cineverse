import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/seatSelection.css'; // Adjust the import path for your CSS file

const SeatSelection = () => {
    const { scheduleId } = useParams(); // Using useParams hook

    const [seats, setSeats] = useState([]);
    const numRows = 10;
    const numColumns = 12;

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/seats/booking/${scheduleId}`);
                if (Array.isArray(response.data)) {
                    setSeats(response.data);
                } else {
                    setSeats([]); // Ensure seats is an array even if the response is unexpected
                }
            } catch (error) {
                console.error('Error fetching seats:', error);
                setSeats([]); // Ensure seats is an array even if there's an error
            }
        };

        fetchSeats();
    }, [scheduleId]);

    const renderSeats = () => {
        let seatRows = [];
        for (let row = 1; row <= numRows; row++) {
            let seatColumns = [];
            for (let column = 1; column <= numColumns; column++) {
                const seat = seats.find(seat => seat.row === String.fromCharCode(64 + row) && seat.column === column);
                const isBooked = seat && seat.isBooked;

                seatColumns.push(
                    <div key={column} className={`seat ${isBooked ? 'booked' : 'available'}`}>
                    </div>
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
                        <div className="label"></div> {/* Empty label for alignment */}
                        {renderColumnLabels()}
                    </div>
                    {renderSeats()}
                </div>
            </div>
            <div className="booking-info">
                <h2>Booking Information</h2>
                {/* Add your booking information display logic here */}
            </div>
        </div>
    );
};

export default SeatSelection;
