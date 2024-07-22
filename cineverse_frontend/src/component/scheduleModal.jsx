import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/scheduleModal.css'; // Ensure this points to the updated CSS file

const ScheduleModal = ({ show, handleClose, schedule }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();

    const today = new Date().setHours(0, 0, 0, 0);
    const filteredDates = schedule.dates.filter(date => new Date(date).setHours(0, 0, 0, 0) >= today);

    useEffect(() => {
        if (selectedDate === null && filteredDates.length > 0) {
            setSelectedDate(filteredDates[0]);
        }
    }, [filteredDates, selectedDate]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleProceedToSeats = () => {
        if (selectedDate && selectedTime) {
            const scheduleItem = schedule.schedules[selectedDate]?.find(item =>
                item.times.some(t => t.time === selectedTime)
            );
            const timeItem = scheduleItem?.times.find(t => t.time === selectedTime);
            if (timeItem && timeItem.scheduleId) {
                navigate(`/seat-selection/${timeItem.scheduleId}`);
            } else {
                console.error('No schedule item found for the selected date and time.');
            }
        }
    };

    return (
        <div className={`custom-unique-modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="custom-unique-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="custom-unique-modal-close" onClick={handleClose}>&times;</button>
                <div className="custom-unique-modal-buttons">
                    {filteredDates.map((date, index) => (
                        <button
                            key={index}
                            className={`custom-unique-modal-button ${selectedDate === date ? 'active' : ''}`}
                            onClick={() => handleDateClick(date)}
                        >
                            <div className="custom-button-date">
                                <div className="custom-button-date-month">{new Date(date).toLocaleString('default', { month: 'short' })}</div>
                                <div className="custom-button-date-dayName">{new Date(date).toLocaleString('default', { weekday: 'short' })}</div>
                            </div>
                            <div className="custom-button-day">{new Date(date).getDate()}</div>
                        </button>
                    ))}
                </div>
                {selectedDate && (
                    <div>
                        <p className="select-time-label">Select Time</p>
                        {schedule.schedules[selectedDate].map((scheduleItem, index) => (
                            <div key={index}>
                                <p className="custom-cinema-name">{scheduleItem.location}</p>
                                <div className="custom-unique-modal-time-buttons">
                                    {scheduleItem.times.map((timeItem, idx) => (
                                        <button
                                            key={idx}
                                            className={`custom-unique-modal-time-button ${selectedTime === timeItem.time ? 'active' : ''}`}
                                            onClick={() => handleTimeClick(timeItem.time)}
                                        >
                                            {timeItem.time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    className="custom-proceed-button"
                    onClick={handleProceedToSeats}
                    disabled={!selectedDate || !selectedTime}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default ScheduleModal;
