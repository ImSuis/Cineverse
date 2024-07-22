import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/searchResults.css';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://localhost:5001/api/movies/search?title=${searchQuery}`);
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (searchQuery) {
      fetchMovies();
    }
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h1 className="search-results-title">Search results for: {searchQuery}</h1>
      </div>
      <div className="search-results-divider"></div>
      <div className="custom-poster-container">
        {movies.map((movie) => (
          <div key={movie.id} className="custom-poster-wrapper">
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.posterUrl} alt={movie.title} className="custom-now-showing-poster" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
