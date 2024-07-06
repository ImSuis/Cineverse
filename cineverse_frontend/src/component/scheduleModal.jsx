import React, { useState } from 'react';
import '../style/scheduleModal.css'; // Replace with your unique CSS file

const ScheduleModal = ({ show, handleClose, schedule }) => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };

    // Example data for buttons (month, day, dayName)
    const buttonsData = [
        { month: '11', dayName: 'Sun', day: '11' },
        { month: '11', dayName: 'Mon', day: '12' },
        { month: '11', dayName: 'Tue', day: '13' },
    ];

    return (
        <div className={`unique-modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="unique-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="unique-modal-close" onClick={handleClose}>&times;</button>
                <div className="unique-modal-buttons">
                    {buttonsData.map((button, index) => (
                        <button
                            key={index}
                            className={`unique-modal-button ${selectedButton === index ? 'active' : ''}`}
                            onClick={() => handleButtonClick(index)}
                        >
                            <div className="button-date">
                                <div className="button-date-month">{button.month}</div>
                                <div className="button-date-dayName">{button.dayName}</div>
                            </div>
                            <div className="button-day">{button.day}</div>
                        </button>
                    ))}
                </div>
                {/* Add your modal content here */}
                {/* Example schedule content */}
                {schedule && (
                    <div>
                        <p>{schedule.title}</p>
                        <p>{schedule.time}</p>
                        <p>{schedule.location}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleModal;
