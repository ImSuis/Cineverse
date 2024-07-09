// src/components/AddMovie.js

import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Sidebar from '../admin/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
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
            await axios.post('http://localhost:5001/api/movies/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Movie added successfully');
            setTimeout(() => {
                navigate('/admin/movies');
            }, 2000);
        } catch (error) {
            toast.error('Error adding movie');
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <h1>Add Movie</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie title" name="title" value={formData.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDirector">
                        <Form.Label>Director</Form.Label>
                        <Form.Control type="text" placeholder="Enter director's name" name="director" value={formData.director} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter movie description" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formReleaseDate">
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formCast">
                        <Form.Label>Cast</Form.Label>
                        <Form.Control type="text" placeholder="Enter cast members" name="cast" value={formData.cast} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie genre" name="genre" value={formData.genre} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formRuntime">
                        <Form.Label>Runtime</Form.Label>
                        <Form.Control type="number" placeholder="Enter runtime in minutes" name="runtime" value={formData.runtime} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie rating" name="rating" value={formData.rating} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formLanguage">
                        <Form.Label>Language</Form.Label>
                        <Form.Control type="text" placeholder="Enter movie language" name="language" value={formData.language} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formTrailerUrl">
                        <Form.Label>Trailer URL</Form.Label>
                        <Form.Control type="text" placeholder="Enter trailer URL" name="trailerUrl" value={formData.trailerUrl} onChange={handleChange} />
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
                        Add Movie
                    </Button>
                </Form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddMovie;
