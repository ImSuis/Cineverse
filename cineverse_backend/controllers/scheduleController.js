const Schedule = require("../model/scheduleModel");
const Seat = require("../model/seatModel");

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { date, MovieId, LocationId, ShowtimeId } = req.body;

    const newSchedule = await Schedule.create({
      date,
      MovieId,
      LocationId,
      ShowtimeId
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Error creating schedule", error });
  }
};

