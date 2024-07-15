const express = require("express");
const multiparty = require("connect-multiparty");
const movieController = require("../controllers/movieController");

const router = express.Router();
const multipartyMiddleware = multiparty();

// Route to add a new movie
router.post("/add", multipartyMiddleware, movieController.addMovie);

// Route to get "Now Showing" movies
router.get("/now-showing", movieController.getNowShowingMovies);

// Route to get "Coming Soon" movies
router.get("/coming-soon", movieController.getComingSoonMovies);

// Route to search movies by title
router.get("/search", movieController.searchMovies);

// Route to get a single movie by ID
router.get("/:id", movieController.getSingleMovie);

// Wildcard route to handle undefined routes
router.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;
