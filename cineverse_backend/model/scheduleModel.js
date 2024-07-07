const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");
const Seat = require("./seatModel"); // Correct import path
const ScheduleSeat = require("./scheduleSeatModel"); // Correct import path

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
    modelName: "Schedule",
  }
);

Schedule.belongsToMany(Seat, { through: ScheduleSeat });
// Optionally, if you need to relate Schedule to User (through Booking):
// Schedule.hasMany(Booking);
// Booking.belongsTo(Schedule);

module.exports = Schedule;
