// src/components/AddLocation.js

import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './sidebar';

const AddLocation = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/locations/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
                    'Content-Type': 'application/json'
                },
            });
            toast.success('Location added successfully!');
            navigate('/admin/locations');
        } catch (error) {
            console.error('Error adding location:', error);
            toast.error('Failed to add location.');
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content" style={{ marginLeft: '240px' }}>
                <h1>Add Location</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter location name" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter location address" name="address" value={formData.address} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary mt-2" type="submit">
                        Add Location
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddLocation;
