const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Location = sequelize.define('Location', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Location;
