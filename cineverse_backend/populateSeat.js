const { Sequelize } = require("sequelize");
const Seat = require("./model/seatModel"); // Adjust the path as per your project structure

// Database configuration
const sequelize = new Sequelize(
  "Cineverse", // Replace with your DB_NAME
  "postgres", // Replace with your DB_USER
  "MyPostgres", // Replace with your DB_PASSWORD
  {
    host: "localhost", // Replace with your DB_HOST
    dialect: "postgres",
    logging: false,
  }
);

const numRows = 10; // Number of rows
const numColumns = 12; // Number of columns

async function populateSeats() {
  try {
    // Ensure database connection
    await sequelize.authenticate();
    //console.log('Connection has been established successfully.');

    // Create seats
    let seats = [];
    for (let row = 1; row <= numRows; row++) {
      for (let column = 1; column <= numColumns; column++) {
        seats.push({
          row: String.fromCharCode(64 + row), // Convert to letters A, B, C, ...
          column: column,
        });
      }
    }

    // Bulk create seats
    await Seat.bulkCreate(seats);
    //console.log('Seats have been successfully populated.');

    // Close database connection
    await sequelize.close();
    //console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error("Error populating seats:", error);
  }
}

populateSeats();
