// src/components/ManageShowtimes.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../admin/sidebar';

const ManageShowtimes = () => {
    const [showtimes, setShowtimes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchShowtimes();
    }, []);

    const fetchShowtimes = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/showtimes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token here
                }
            });
            setShowtimes(response.data); // Assuming response.data is an array of showtimes
        } catch (error) {
            console.error('Error fetching showtimes:', error);
        }
    };

    const handleAddShowtime = () => {
        navigate('/admin/showtimes/add'); // Add a route for adding showtimes if needed
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content" style={{ marginLeft: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ margin: '0' }}>Manage Showtimes</h1>
                    <Button variant="primary" onClick={handleAddShowtime}>Add Showtime</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showtimes.map((showtime) => (
                            <tr key={showtime.id}>
                                <td>{showtime.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageShowtimes;
