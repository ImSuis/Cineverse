// src/components/ManageSchedules.js

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from '../admin/sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/schedules',  {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token here
                }
            });
            setSchedules(response.data); // Assuming response.data is an array of schedules
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const handleAddSchedule = () => {
        navigate('/admin/schedules/add'); // Add a route for adding schedules if needed
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content" style={{ marginLeft: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ margin: '0' }}>Manage Schedules</h1>
                    <Button variant="primary" onClick={handleAddSchedule}>Add Schedule</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Movie</th>
                            <th>Location</th>
                            <th>Showtime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.id}>
                                <td>{schedule.date}</td>
                                <td>{schedule.Movie.title}</td>
                                <td>{schedule.Location.name}</td>
                                <td>{schedule.Showtime.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageSchedules;
