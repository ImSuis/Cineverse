const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const syncDatabase = async () => {
  try {
    // Import models here to ensure they are registered with Sequelize before synchronization
    require("../model/userModel");
    require("../model/movieModel");
    require("../model/bookingModel");

    await sequelize.sync({ alter: true }); // Use { alter: true } to avoid dropping tables, or { force: true } if you want to drop and recreate tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

// Test connection and sync database
const initializeDatabase = async () => {
  await testConnection();
  await syncDatabase();
};

initializeDatabase();

module.exports = sequelize;
