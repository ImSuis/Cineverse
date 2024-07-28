const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const https = require("https");

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

// Import models and associations
require("./model/userModel");
require("./model/scheduleModel");
require("./model/seatModel");
require("./model/movieModel");
require("./model/locationModel");
require("./model/showtimeModel");
require("./model/association");
require("./model/auditLogModel");

// Initialize database
require("./database/init");

// Routes
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/locations", require("./routes/locationRoutes"));
app.use("/api/seats", require("./routes/seatRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"));
app.use("/api/showtimes", require("./routes/showtimeRoutes"));
app.use("/api/audit-logs", require("./routes/auditRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Read the SSL certificate files
const privateKey = fs.readFileSync("server.key");
const certificate = fs.readFileSync("server.crt");

const credentials = {
  key: privateKey,
  cert: certificate,
};

const PORT = process.env.PORT || 5001;

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the HTTPS server
httpsServer.listen(PORT, () => {
  //console.log(`HTTPS Server is running on port ${PORT}`);
});

module.exports = app;
