// src/components/ManageLocations.js

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from '../admin/sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageLocations = () => {
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/locations', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token here
                }
            });
            setLocations(response.data); // Assuming response.data is an array of locations
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleAddLocation = () => {
        navigate('/admin/locations/add'); // Add a route for adding locations if needed
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content" style={{ marginLeft: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ margin: '0' }}>Manage Locations</h1>
                    <Button variant="primary" onClick={handleAddLocation}>Add Location</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((location) => (
                            <tr key={location.id}>
                                <td>{location.name}</td>
                                <td>{location.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageLocations;
