// src/components/AddShowtime.js

import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Sidebar from '../admin/sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddShowtime = () => {
    const [formData, setFormData] = useState({
        time: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:5001/api/showtimes/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
                    'Content-Type': 'application/json'
                },
            });
            toast.success('Showtime added successfully!');
            navigate('/admin/showtimes');
        } catch (error) {
            console.error('Error adding showtime:', error);
            toast.error('Failed to add showtime.');
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content" style={{ marginLeft: '240px' }}>
                <h1>Add Showtime</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" placeholder="Enter showtime" name="time" value={formData.time} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary mt-2" type="submit">
                        Add Showtime
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddShowtime;
