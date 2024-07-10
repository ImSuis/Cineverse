import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaClock } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import '../style/movie.css'; // Ensure to create and style this CSS file accordingly
import ScheduleModal from '../component/scheduleModal'; // Import the ScheduleModal component

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [schedule, setSchedule] = useState({ dates: [], schedules: {} }); // State to hold schedules
    const [videoId, setVideoId] = useState('');
    const [show, setShow] = useState(false); // State to control YouTube video modal visibility

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
            setShowModal(true);
        } else {
            console.error('Invalid YouTube URL');
        }
    };

    const handleClose = () => setShowModal(false);

    // Function to check if release date is greater than current date
    const isReleased = () => {
        if (!movie || !movie.releaseDate) {
            return false; // Handle case where movie or release date is missing
        }
        const releaseDate = new Date(movie.releaseDate);
        const currentDate = new Date();
        return releaseDate <= currentDate; // Return true if release date is less than or equal to current date
    };

    // Function to fetch schedules when "Get Ticket" button is clicked
    const handleGetTicket = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/schedules/movie/${id}`);
            console.log('Backend response:', response.data); // Log the response data
            const groupedSchedules = response.data;
            const dates = Object.keys(groupedSchedules);

            // Determine the first date for the movie
            const initialDate = dates.length > 0 ? dates[0] : null;

            setSchedule({ dates, schedules: groupedSchedules });
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching schedules:', error.message);
        }
    };

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
                        {isReleased() && <button onClick={handleGetTicket}>Get Ticket</button>}
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

            {/* Render the ScheduleModal component */}
            <ScheduleModal
                show={showModal}
                handleClose={handleClose}
                schedule={schedule}
                initialDate={schedule.dates.length > 0 ? schedule.dates[0] : null}
            />

            {/* Render the YouTube video modal */}
            <Modal show={show} onHide={handleClose} centered dialogClassName="video-modal">
                <Modal.Body className="p-0">
                    <YouTube videoId={videoId} className="youtube-video" />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Movie;
