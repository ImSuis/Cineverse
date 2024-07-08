const Showtime = require("../model/showtimeModel");

// Create a new showtime
exports.createShowtime = async (req, res) => {
  try {
    const { time } = req.body;
    const newShowtime = await Showtime.create({
      time,
    });

    res.status(201).json(newShowtime);
  } catch (error) {
    console.error("Error creating showtime:", error);
    res.status(500).json({ message: "Error creating showtime", error });
  }
};

// Get all showtimes
exports.getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.findAll();
    res.status(200).json(showtimes);
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    res.status(500).json({ message: "Error fetching showtimes", error });
  }
};

// Get showtime by ID
exports.getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }
    res.status(200).json(showtime);
  } catch (error) {
    console.error("Error fetching showtime by ID:", error);
    res.status(500).json({ message: "Error fetching showtime by ID", error });
  }
};

// Update showtime by ID
exports.updateShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { time } = req.body;

    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    await showtime.update({
      time,
    });

    res.status(200).json(showtime);
  } catch (error) {
    console.error("Error updating showtime by ID:", error);
    res.status(500).json({ message: "Error updating showtime by ID", error });
  }
};

// Delete showtime by ID
exports.deleteShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    await showtime.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting showtime by ID:", error);
    res.status(500).json({ message: "Error deleting showtime by ID", error });
  }
};
