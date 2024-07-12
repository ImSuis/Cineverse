const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');
const Schedule = require('./scheduleModel');
const Seat = require('./seatModel');

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
    tableName: 'ScheduleSeats',
    indexes: [
      {
        unique: true,
        fields: ['ScheduleId', 'SeatId'],
      },
    ],
  }
);

// Ensure ScheduleSeat associations are correct
ScheduleSeat.belongsTo(Schedule);
ScheduleSeat.belongsTo(Seat);

module.exports = ScheduleSeat;
