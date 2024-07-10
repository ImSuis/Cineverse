import React, { useState, useEffect } from 'react';
import '../style/scheduleModal.css'; // Replace with your unique CSS file

const ScheduleModal = ({ show, handleClose, schedule }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Effect to set the initial selected date when modal opens
    useEffect(() => {
        if (schedule.dates.length > 0) {
            setSelectedDate(schedule.dates[0]); // Select the first date by default
        }
    }, [schedule]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset selected time
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    return (
        <div className={`unique-modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="unique-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="unique-modal-close" onClick={handleClose}>&times;</button>
                <div className="unique-modal-buttons">
                    {schedule.dates.map((date, index) => (
                        <button
                            key={index}
                            className={`unique-modal-button ${selectedDate === date ? 'active' : ''}`}
                            onClick={() => handleDateClick(date)}
                        >
                            <div className="button-date">
                                <div className="button-date-month">{new Date(date).toLocaleString('default', { month: 'short' })}</div>
                                <div className="button-date-dayName">{new Date(date).toLocaleString('default', { weekday: 'short' })}</div>
                            </div>
                            <div className="button-day">{new Date(date).getDate()}</div>
                        </button>
                    ))}
                </div>
                {selectedDate && schedule.schedules[selectedDate] && schedule.schedules[selectedDate].map((item, index) => (
                    <div key={index}>
                        <p className="cinema-name">{item.location}</p>
                        <div className="unique-modal-time-buttons">
                            <button
                                className={`unique-modal-time-button ${selectedTime === item.time ? 'active' : ''}`}
                                onClick={() => handleTimeClick(item.time)}
                            >
                                {item.time}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleModal;