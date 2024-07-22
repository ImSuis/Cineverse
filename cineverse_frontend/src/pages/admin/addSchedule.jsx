// src/components/AddSchedule.js

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../admin/sidebar';

const AddSchedule = () => {
    const [movies, setMovies] = useState([]);
    const [locations, setLocations] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
        fetchLocations();
        fetchShowtimes();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/movies/now-showing');
            setMovies(response.data.movies); // Assuming response.data.movies is an array of movies
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/locations', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLocations(response.data); // Assuming response.data is an array of locations
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchShowtimes = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/showtimes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setShowtimes(response.data); // Assuming response.data is an array of showtimes
        } catch (error) {
            console.error('Error fetching showtimes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:5001/api/schedules/create', {
                date,
                MovieId: selectedMovie,
                LocationId: selectedLocation,
                ShowtimeId: selectedShowtime
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/admin/schedules');
        } catch (error) {
            console.error('Error adding schedule:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <h1>Add Schedule</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formMovie">
                        <Form.Label>Movie</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedMovie}
                            onChange={(e) => setSelectedMovie(e.target.value)}
                            required
                        >
                            <option value="">Select a movie</option>
                            {movies.map((movie) => (
                                <option key={movie.id} value={movie.id}>
                                    {movie.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            required
                        >
                            <option value="">Select a location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formShowtime">
                        <Form.Label>Showtime</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedShowtime}
                            onChange={(e) => setSelectedShowtime(e.target.value)}
                            required
                        >
                            <option value="">Select a showtime</option>
                            {showtimes.map((showtime) => (
                                <option key={showtime.id} value={showtime.id}>
                                    {showtime.time}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Schedule
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddSchedule;
