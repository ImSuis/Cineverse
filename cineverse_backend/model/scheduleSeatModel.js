const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class ScheduleSeat extends Model {}

ScheduleSeat.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ScheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SeatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ScheduleSeat',
    tableName: 'ScheduleSeats', // Optional: specify the table name explicitly
  }
);

module.exports = ScheduleSeat;
