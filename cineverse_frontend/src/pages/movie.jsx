import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaClock } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import '../style/movie.css'; // Ensure to create and style this CSS file accordingly

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/movies/${id}`);
                setMovie(response.data.movie);
            } catch (error) {
                console.error('Error fetching movie:', error.message);
            }
        };

        fetchMovie();
    }, [id]);

    const extractVideoId = (url) => {
        const regex = /[?&]v=([^&#]*)/;
        const match = url.match(regex);
        return match ? match[1] : null;
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

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-page">
            <div className="movie-banner" style={{ backgroundImage: `url(${movie.landscapeImageUrl})` }}></div>
            <div className="movie-details">
                <div className="poster">
                    <img src={movie.posterUrl} alt="Movie Poster" />
                </div>
                <div className="details">
                    <h1>{movie.title}</h1>
                    <p>
                        <FaClock style={{ color: 'orange' }} /> {/* Set the color to orange */}
                        {`${Math.floor(movie.runtime / 60)} hr ${movie.runtime % 60} min`}
                    </p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Language:</strong> {movie.language}</p>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                    <div className="buttons">
                        <button onClick={() => handleShow(movie.trailerUrl)}>Watch Trailer</button>
                        <button>Get Ticket</button>
                    </div>
                </div>
            </div>
            <div className="dashed-line"></div> {/* Add the dashed line */}
            <div className="synopsis-container"> {/* Add a container for synopsis */}
                <div className="synopsis">
                    <h2>Synopsis</h2>
                    <p>{movie.description}</p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered dialogClassName="video-modal">
                <Modal.Body className="p-0">
                    <YouTube videoId={videoId} className="youtube-video" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Movie;
