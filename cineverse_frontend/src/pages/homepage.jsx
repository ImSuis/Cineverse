import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import ComingSoon from '../component/comingSoon';
import NowShowing from '../component/nowShowing';
import '../style/homepage.css';
import ScheduleModal from '../component/scheduleModal'; // Import the ScheduleModal component
import Footer from '../component/footer';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
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
    }, []);

    const handleGetTicket = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/schedules/movie/${movieId}`);
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

    return (
        <div className="homepage">
            <Carousel fade controls={false} interval={5000} pause={false} indicators className="custom-carousel">
                {nowShowingMovies.map(movie => (
                    <Carousel.Item key={movie.id}>
                        <div className="carousel-image" style={{ backgroundImage: `url(${movie.landscapeImageUrl})` }}>
                            <Link to={`/movie/${movie.id}`}>
                                <div className="carousel-image-link" />
                            </Link>
                            <button className="get-ticket-button" onClick={() => handleGetTicket(movie.id)}>
                                Get Ticket
                            </button>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div id="now-showing">
                <NowShowing />
            </div>
            <div id="coming-soon">
                <ComingSoon />
            </div>

            <ScheduleModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                schedule={schedule}
                initialDate={schedule.dates.length > 0 ? schedule.dates[0] : null}
            />
        </div>
    );
};

export default Homepage;
