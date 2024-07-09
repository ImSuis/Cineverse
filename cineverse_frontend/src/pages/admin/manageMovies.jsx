// src/components/ManageMovies.js

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Sidebar from '../admin/sidebar';
import axios from 'axios';

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/movies/now-showing');
            setMovies(response.data.movies); // Assuming response.data.movies is an array of movies
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ margin: '0' }}>Manage Movies Page</h1>
                    <Button variant="primary">Add Movie</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Description</th>
                            <th>Release Date</th>
                            <th>Cast</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.description}</td>
                                <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                                <td>{movie.cast.join(', ')}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.rating}</td>
                                <td>{movie.language}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageMovies;
