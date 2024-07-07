const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

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
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  runtime: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cast: {
    type: DataTypes.ARRAY(DataTypes.STRING),
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Movie;
