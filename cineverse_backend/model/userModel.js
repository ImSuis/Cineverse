const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db");
const ScheduleSeat = require("./scheduleSeatModel");

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
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetCodeExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    previousPasswords: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(ScheduleSeat);

module.exports = User;
