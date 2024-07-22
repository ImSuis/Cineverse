const sequelize = require("./db");

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    //console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const syncDatabase = async () => {
  try {
    // Import models here to ensure they are registered with Sequelize before synchronization
    await sequelize.sync({ alter: true });
    //console.log("Database synchronized successfully.");
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
