import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Sidebar from '../admin/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditMovie = () => {
    const { id } = useParams(); // Get movie ID from URL
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        releaseDate: '',
        genre: '',
        runtime: '',
        director: '',
        cast: '',
        language: '',
        trailerUrl: '',
        rating: '',
        poster: null,
        landscapeImage: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://localhost:5001/api/movies/${id}`);
                const { movie } = response.data;

                // Convert ISO date string to YYYY-MM-DD
                const releaseDate = new Date(movie.releaseDate).toISOString().split('T')[0];

                setFormData({
                    ...movie,
                    releaseDate: releaseDate,
                    cast: movie.cast.join(', '),
                    poster: null,
                    landscapeImage: null,
                });
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            await axios.put(`https://localhost:5001/api/movies/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Movie updated successfully');
            setTimeout(() => {
                navigate('/admin/movies');
            }, 2000);
        } catch (error) {
            toast.error('Error updating movie');
            console.error('Error updating movie:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <h1>Edit Movie</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formReleaseDate">
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" name="genre" value={formData.genre} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formRuntime">
                        <Form.Label>Runtime</Form.Label>
                        <Form.Control type="text" name="runtime" value={formData.runtime} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDirector">
                        <Form.Label>Director</Form.Label>
                        <Form.Control type="text" name="director" value={formData.director} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCast">
                        <Form.Label>Cast</Form.Label>
                        <Form.Control type="text" name="cast" value={formData.cast} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formLanguage">
                        <Form.Label>Language</Form.Label>
                        <Form.Control type="text" name="language" value={formData.language} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formTrailerUrl">
                        <Form.Label>Trailer URL</Form.Label>
                        <Form.Control type="text" name="trailerUrl" value={formData.trailerUrl} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" name="rating" value={formData.rating} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPoster">
                        <Form.Label>Poster</Form.Label>
                        <Form.Control type="file" name="poster" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group controlId="formLandscapeImage">
                        <Form.Label>Landscape Image</Form.Label>
                        <Form.Control type="file" name="landscapeImage" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary mt-2" type="submit">
                        Update Movie
                    </Button>
                </Form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default EditMovie;
