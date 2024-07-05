// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Import the Sequelize instance

const User = sequelize.define('User', {
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
  });
  
  module.exports = User;