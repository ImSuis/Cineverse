const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Showtime = sequelize.define("Showtime", {
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

module.exports = Showtime;
