import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import Sidebar from '../admin/sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/movies/now-showing');
            setMovies(response.data.movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleAddMovie = () => {
        navigate('/admin/movies/add');
    };

    const handleEditMovie = (id) => {
        navigate(`/admin/movies/edit/${id}`);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ margin: '0' }}>Manage Movies Page</h1>
                    <Button variant="primary" onClick={handleAddMovie}>Add Movie</Button>
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
                            <th>Edit</th> {/* New column for Edit */}
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
                                <td>
                                    <Button variant="link" onClick={() => handleEditMovie(movie.id)}>
                                        <FaEdit />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageMovies;
