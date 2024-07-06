const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Ensure correct path
const User = require('./userModel'); // Ensure correct path
const Movie = require('./movieModel'); // Ensure correct path

const Booking = sequelize.define('Booking', {
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

// Define associations after all models are defined
User.hasMany(Booking);
Booking.belongsTo(User);
Movie.hasMany(Booking);
Booking.belongsTo(Movie);

module.exports = Booking;
