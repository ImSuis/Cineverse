import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/scheduleModal.css'; // Replace with your unique CSS file

const ScheduleModal = ({ show, handleClose, schedule }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();

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

    const handleProceedToSeats = () => {
        if (selectedDate && selectedTime) {
            const scheduleItem = schedule.schedules[selectedDate]?.find(item =>
                item.times.some(t => t.time === selectedTime)
            );
            const timeItem = scheduleItem?.times.find(t => t.time === selectedTime);
            console.log('Selected schedule item:', scheduleItem); // Debug log
            if (timeItem && timeItem.scheduleId) {
                navigate(`/seat-selection/${timeItem.scheduleId}`);
            } else {
                console.error('No schedule item found for the selected date and time.');
            }
        }
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
                {selectedDate && schedule.schedules[selectedDate] && schedule.schedules[selectedDate].map((scheduleItem, index) => (
                    <div key={index}>
                        <p className="cinema-name">{scheduleItem.location}</p>
                        <div className="unique-modal-time-buttons">
                            {scheduleItem.times.map((timeItem, idx) => (
                                <button
                                    key={idx}
                                    className={`unique-modal-time-button ${selectedTime === timeItem.time ? 'active' : ''}`}
                                    onClick={() => handleTimeClick(timeItem.time)}
                                >
                                    {timeItem.time}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    className="proceed-button"
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
