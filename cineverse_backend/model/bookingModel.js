// models/booking.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./userModel");
const Movie = require("./movieModel");

const Booking = sequelize.define("Booking", {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  showtime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Establishing relationships
User.hasMany(Booking);
Booking.belongsTo(User);
Movie.hasMany(Booking);
Booking.belongsTo(Movie);

module.exports = Booking;
