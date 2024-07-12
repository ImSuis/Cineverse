const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');
const Seat = require('./seatModel');

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

Schedule.belongsToMany(Seat, { through: 'ScheduleSeat' });
Seat.belongsToMany(Schedule, { through: 'ScheduleSeat' });

module.exports = Schedule;
