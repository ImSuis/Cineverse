const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db'); // Import the Sequelize instance
const ScheduleSeat = require('./scheduleSeatModel'); // Correct import path
const Seat = require('./seatModel'); // Correct import path

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

User.belongsToMany(Seat, { through: ScheduleSeat });
// Optionally, if you need to relate User to Schedule (through Booking):
// User.belongsToMany(Schedule, { through: Booking });

module.exports = User;
