const Schedule = require("../model/scheduleModel");
const Seat = require("../model/seatModel");
const Movie = require("../model/movieModel");
const Location = require("../model/locationModel");
const Showtime = require("../model/showtimeModel");

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { date, MovieId, LocationId, ShowtimeId } = req.body;

    const newSchedule = await Schedule.create({
      date,
      MovieId,
      LocationId,
      ShowtimeId,
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Error creating schedule", error });
  }
};
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        { model: Movie, attributes: ['title'] },
        { model: Location, attributes: ['name'] },
        { model: Showtime, attributes: ['time'] }
      ]
    });
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};

exports.getAllSchedulesByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const schedules = await Schedule.findAll({
      where: { MovieId: movieId },
      include: [
        { model: Movie, attributes: ["title"] },
        { model: Location, attributes: ["name"] },
        { model: Showtime, attributes: ["time"] },
      ],
      order: [["date", "ASC"]],
    });

    // Using an object to store unique locations for each date
    const groupedSchedules = schedules.reduce((acc, schedule) => {
      const date = schedule.date;
      if (!acc[date]) {
        acc[date] = [];
      }

      // Check if the location already exists for this date
      const existingLocation = acc[date].find(item => item.location === schedule.Location.name);
      if (!existingLocation) {
        acc[date].push({
          location: schedule.Location.name,
          times: [{ time: schedule.Showtime.time, scheduleId: schedule.id }], // Store times as an array of objects
        });
      } else {
        // Add time to existing location
        existingLocation.times.push({ time: schedule.Showtime.time, scheduleId: schedule.id });
      }

      return acc;
    }, {});

    res.status(200).json(groupedSchedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};



// Get schedule by ID
// exports.getScheduleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const schedule = await Schedule.findByPk(id, {});
//     if (!schedule) {
//       return res.status(404).json({ message: "Schedule not found" });
//     }
//     res.status(200).json(schedule);
//   } catch (error) {
//     console.error("Error fetching schedule by ID:", error);
//     res.status(500).json({ message: "Error fetching schedule by ID", error });
//   }
// };

// Update schedule by ID
exports.updateScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, MovieId, LocationId, ShowtimeId } = req.body;

    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    await schedule.update({
      date,
      MovieId,
      LocationId,
      ShowtimeId,
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error updating schedule by ID:", error);
    res.status(500).json({ message: "Error updating schedule by ID", error });
  }
};

// Delete schedule by ID
exports.deleteScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    await schedule.destroy();
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule by ID:", error);
    res.status(500).json({ message: "Error deleting schedule by ID", error });
  }
};
