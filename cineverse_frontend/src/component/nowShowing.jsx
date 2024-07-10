import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import '../style/nowShowing.css';
import ScheduleModal from './scheduleModal';

const NowShowing = () => {
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const [postersPerSlide, setPostersPerSlide] = useState(3);
    const [showModal, setShowModal] = useState(false);
    const [schedule, setSchedule] = useState({ dates: [], schedules: {} });
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchNowShowingMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/movies/now-showing');
                setNowShowingMovies(response.data.movies);
            } catch (error) {
                console.error('Error fetching now showing movies:', error.message);
            }
        };

        fetchNowShowingMovies();

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setPostersPerSlide(2);
            } else {
                setPostersPerSlide(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleIconClick = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/schedules/movie/${movieId}`);
            console.log('Backend response:', response.data); // Log the response data
            const groupedSchedules = response.data;
            const dates = Object.keys(groupedSchedules);

            // Determine the first date for the movie
            const initialDate = dates.length > 0 ? dates[0] : null;

            setSchedule({ dates, schedules: groupedSchedules });
            setSelectedMovie(movieId);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching schedules:', error.message);
        }
    };

    const groupedMovies = nowShowingMovies.reduce((acc, movie, index) => {
        const groupIndex = Math.floor(index / postersPerSlide);
        if (!acc[groupIndex]) {
            acc[groupIndex] = [];
        }
        acc[groupIndex].push(movie);
        return acc;
    }, []);

    return (
        <div className="now-showing-container">
            <div className="dotted-line"></div>
            <h2 className="now-showing-title">Now Showing</h2>
            <Carousel indicators={false}>
                {groupedMovies.map((movieGroup, index) => (
                    <Carousel.Item key={index}>
                        <div className="poster-container">
                            {movieGroup.map(movie => (
                                <div key={movie.id} className="poster-wrapper">
                                    <Link to={`/movie/${movie.id}`}>
                                        <img src={movie.posterUrl} className="now-showing-poster" alt="Movie Poster" />
                                    </Link>
                                    <div className="ticket-icon" onClick={() => handleIconClick(movie.id)}>
                                        <BsFillTicketPerforatedFill size={24} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="dotted-line"></div>
            <ScheduleModal show={showModal} handleClose={() => setShowModal(false)} schedule={schedule} initialDate={schedule.dates.length > 0 ? schedule.dates[0] : null} />
        </div>
    );
};

export default NowShowing;
