// models/movie.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db"); // Import the Sequelize instance

const Movie = sequelize.define("Movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: true, // Allow releaseDate to be null
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  runtime: {
    type: DataTypes.INTEGER, // Runtime in minutes
    allowNull: true,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cast: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings for cast members
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  posterUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landscapeImageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trailerUrl: {
    type: DataTypes.STRING, // URL to the movie trailer
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT, // Average rating
    allowNull: true,
  },
});

module.exports = Movie;
