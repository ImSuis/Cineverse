import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { FaClock, FaTag } from 'react-icons/fa';
import YouTube from 'react-youtube';
import '../style/comingSoon.css';

const ComingSoon = () => {
    const [comingSoonMovies, setComingSoonMovies] = useState([]);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        const fetchComingSoonMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/movies/coming-soon');
                setComingSoonMovies(response.data.movies);
            } catch (error) {
                console.error('Error fetching coming soon movies:', error.message);
            }
        };

        fetchComingSoonMovies();
    }, []);

    const extractVideoId = (url) => {
        const regex = /[?&]v=([^&#]*)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const handleShow = (url) => {
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
            setShow(true);
        } else {
            console.error('Invalid YouTube URL');
        }
    };

    const handleClose = () => setShow(false);

    // Group movies into chunks of 3 for the carousel
    const groupedMovies = comingSoonMovies.reduce((acc, movie, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }
        acc[groupIndex].push(movie);
        return acc;
    }, []);

    return (
        <div className="coming-soon-container">
            <h2 className="coming-soon-title">Coming Soon</h2>
            <Carousel indicators={false}>
                {groupedMovies.map((movieGroup, index) => (
                    <Carousel.Item key={index}>
                        <div className="image-container">
                            {movieGroup.map(movie => (
                                <div key={movie.id} className="image-wrapper">
                                    <img src={movie.landscapeImageUrl} className="coming-soon-image" alt="Movie Poster" />
                                    <div className="image-box">
                                        <div className="box-content">
                                            <h3>{movie.title}</h3>
                                            <div className="details">
                                                <p><FaTag className="icon-tag" /> {movie.genre}</p>
                                                <p><FaClock className="icon-tag" /> {formatRuntime(movie.runtime)}</p>
                                            </div>
                                            <button onClick={() => handleShow(movie.trailerUrl)}>Watch Trailer</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Modal show={show} onHide={handleClose} centered dialogClassName="video-modal">
                <Modal.Body className="p-0">
                    <YouTube videoId={videoId} className="youtube-video" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ComingSoon;
