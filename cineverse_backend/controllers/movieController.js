const cloudinary = require("cloudinary").v2;
const Movie = require("../model/movieModel");
const { Op } = require("sequelize");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Controller function to add a new movie
const addMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      releaseDate,
      genre,
      runtime,
      director,
      cast,
      language,
      trailerUrl,
      rating,
    } = req.body;

    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Check if 'poster' and 'landscapeImage' are defined in req.files
    if (!req.files || !req.files.poster || !req.files.landscapeImage) {
      return res.status(400).json({
        message: "Poster and landscape image are required",
      });
    }

    // Upload images to Cloudinary
    const posterResult = await cloudinary.uploader.upload(
      req.files.poster.path,
      {
        folder: "movie_posters",
        crop: "fill",
      }
    );

    const landscapeResult = await cloudinary.uploader.upload(
      req.files.landscapeImage.path,
      {
        folder: "movie_landscape",
        crop: "fill",
      }
    );

    // Convert cast from comma-separated string to array
    const castArray = cast.split(",").map((c) => c.trim());

    // Create new movie with Cloudinary URLs
    const newMovie = await Movie.create({
      title,
      description,
      releaseDate: releaseDate || null, // Handle empty release date
      genre,
      runtime: runtime || null, // Handle empty runtime
      director,
      cast: castArray, // Use the array for cast
      language,
      posterUrl: posterResult.secure_url,
      landscapeImageUrl: landscapeResult.secure_url,
      trailerUrl,
      rating: rating || null, // Handle empty rating
    });

    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    console.error("Error adding movie:", error.message);
    next(error); // Pass the error to the error handling middleware
  }
};
const getSingleMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ movie });
  } catch (error) {
    console.error("Error fetching movie:", error.message);
    next(error); // Pass the error to the error handling middleware
  }
};

const getNowShowingMovies = async (req, res, next) => {
  try {
    const now = new Date();
    const movies = await Movie.findAll({
      where: {
        releaseDate: {
          [Op.lte]: now,
        },
      },
    });
    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching now showing movies:", error.message);
    next(error);
  }
};

const getComingSoonMovies = async (req, res, next) => {
  try {
    const now = new Date();
    const movies = await Movie.findAll({
      where: {
        releaseDate: {
          [Op.gt]: now,
        },
      },
    });
    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching coming soon movies:", error.message);
    next(error);
  }
};

const searchMovies = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query parameter is required" });
    }

    const movies = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`, // Case-insensitive search for matching titles
        },
      },
    });

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found matching the title" });
    }

    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error searching movies:", error.message);
    next(error); // Pass the error to the error handling middleware
  }
};

const editMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const {
      title,
      description,
      releaseDate,
      genre,
      runtime,
      director,
      cast,
      language,
      trailerUrl,
      rating,
    } = req.body;

    // Find the movie by ID
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Optional: Handle file uploads for poster and landscape images
    if (req.files) {
      if (req.files.poster) {
        const posterResult = await cloudinary.uploader.upload(req.files.poster.path, {
          folder: "movie_posters",
          crop: "fill",
        });
        movie.posterUrl = posterResult.secure_url;
      }

      if (req.files.landscapeImage) {
        const landscapeResult = await cloudinary.uploader.upload(req.files.landscapeImage.path, {
          folder: "movie_landscape",
          crop: "fill",
        });
        movie.landscapeImageUrl = landscapeResult.secure_url;
      }
    }

    // Update movie details
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.genre = genre || movie.genre;
    movie.runtime = runtime || movie.runtime;
    movie.director = director || movie.director;
    movie.cast = cast ? cast.split(",").map(c => c.trim()) : movie.cast;
    movie.language = language || movie.language;
    movie.trailerUrl = trailerUrl || movie.trailerUrl;
    movie.rating = rating || movie.rating;

    await movie.save();

    res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (error) {
    console.error("Error updating movie:", error.message);
    next(error);
  }
};

module.exports = {
  addMovie,
  getSingleMovie,
  getNowShowingMovies,
  getComingSoonMovies,
  searchMovies,
  editMovie
};
