const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary").v2; // Import Cloudinary v2

// Initialize dotenv to read .env file
dotenv.config();

// Initialize Express app
const app = express();

// CORS policy
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(multiparty());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
