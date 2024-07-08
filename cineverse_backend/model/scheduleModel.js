const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');
const Seat = require('./seatModel'); // Correct import path

class Schedule extends Model {}

Schedule.init(
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Schedule',
  }
);

Schedule.belongsToMany(Seat, { through: 'ScheduleSeat' }); // Adjust according to your setup

module.exports = Schedule;
