const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./userModel');
const Schedule = require('./scheduleModel');

const Booking = sequelize.define('Booking', {
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

User.hasMany(Booking);
Booking.belongsTo(User);

Schedule.hasMany(Booking);
Booking.belongsTo(Schedule);

module.exports = Booking;
