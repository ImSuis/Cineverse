import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import ComingSoon from '../component/comingSoon';
import NowShowing from '../component/nowShowing';
import { Link } from 'react-router-dom';
import '../style/homepage.css';

const Homepage = () => {
    const [nowShowingMovies, setNowShowingMovies] = useState([]);

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

    return (
        <div className="homepage">
            <Carousel fade controls={false} interval={5000} pause={false} indicators className="custom-carousel">
                {nowShowingMovies.map(movie => (
                    <Carousel.Item key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <div className="carousel-image" style={{ backgroundImage: `url(${movie.landscapeImageUrl})` }}></div>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div id="now-showing">
                <NowShowing />
            </div>
            <div id="coming-soon">
                <ComingSoon />
            </div>
        </div>
    );
};

export default Homepage;
