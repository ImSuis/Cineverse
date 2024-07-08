const Seat = require("../model/seatModel");

// Get all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.findAll();
    res.status(200).json(seats);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ message: "Error fetching seats", error });
  }
};

// Get seat by ID
exports.getSeatById = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }
    res.status(200).json(seat);
  } catch (error) {
    console.error("Error fetching seat by ID:", error);
    res.status(500).json({ message: "Error fetching seat by ID", error });
  }
};

// Update seat by ID
exports.updateSeatById = async (req, res) => {
  try {
    const { id } = req.params;
    const { row, column } = req.body;

    const seat = await Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    await seat.update({
      row,
      column,
    });

    res.status(200).json(seat);
  } catch (error) {
    console.error("Error updating seat by ID:", error);
    res.status(500).json({ message: "Error updating seat by ID", error });
  }
};

// Delete seat by ID
exports.deleteSeatById = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    await seat.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting seat by ID:", error);
    res.status(500).json({ message: "Error deleting seat by ID", error });
  }
};
