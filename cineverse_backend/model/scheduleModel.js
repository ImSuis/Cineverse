const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Movie = require('./movieModel');
const Location = require('./locationModel');
const Showtime = require('./showtimeModel');

const Schedule = sequelize.define('Schedule', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

Movie.hasMany(Schedule);
Schedule.belongsTo(Movie);

Location.hasMany(Schedule);
Schedule.belongsTo(Location);

Showtime.hasMany(Schedule);
Schedule.belongsTo(Showtime);

module.exports = Schedule;
