const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class Seat extends Model {}

Seat.init(
  {
    row: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    column: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Seat',
  }
);

module.exports = Seat;
