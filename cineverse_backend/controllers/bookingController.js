const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Schedule = require("../model/scheduleModel");
const Seat = require("../model/seatModel");
const ScheduleSeat = require("../model/scheduleSeatModel");
const Movie = require("../model/movieModel");
const Location = require("../model/locationModel");
const Showtime = require("../model/showtimeModel");
const User = require("../model/userModel"); // Ensure the correct import path for UserModel

exports.createBooking = async (req, res) => {
  try {
    const { scheduleId, seatIds, totalPrice } = req.body;
    const userId = req.user.id;

    // Log the received data for debugging
    console.log("Decoded User:", req.user);
    console.log("Received data:");
    console.log("Schedule ID:", scheduleId);
    console.log("Seat IDs:", seatIds);
    console.log("Total Price:", totalPrice);

    // Validate scheduleId and seatIds
    if (!scheduleId || !seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
      return res.status(400).json({ message: "Invalid or missing schedule ID or seat IDs" });
    }

    // Check seat availability for the schedule
    const seats = await Seat.findAll({
      where: {
        id: seatIds,
      },
    });

    // Validate if all seats exist
    if (seats.length !== seatIds.length) {
      const invalidSeatIds = seatIds.filter(
        (id) => !seats.find((seat) => seat.id === id)
      );
      console.log("Invalid Seat IDs:", invalidSeatIds);
      return res.status(400).json({
        message: "Invalid seat IDs provided",
        invalidSeatIds,
      });
    }

    // Find the schedule to verify it exists
    const schedule = await Schedule.findByPk(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Check if any of the seats are already booked for the schedule
    const existingBookings = await ScheduleSeat.findAll({
      where: {
        ScheduleId: scheduleId,
        SeatId: seatIds,
      },
    });

    if (existingBookings.length > 0) {
      const alreadyBookedSeatIds = existingBookings.map(
        (booking) => booking.SeatId
      );
      return res.status(400).json({
        message: "One or more seats are already booked for this schedule",
        alreadyBookedSeatIds,
      });
    }

    // Create entries in ScheduleSeat for each seat, schedule, and user
    await Promise.all(
      seats.map(async (seat) => {
        await ScheduleSeat.create({
          UserId: userId,
          ScheduleId: scheduleId,
          SeatId: seat.id,
        });
      })
    );

    // Return success response
    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error });
  }
};



exports.getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await ScheduleSeat.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Schedule,
          include: [
            { model: Movie, attributes: ['title'] }, // Include Movie and select only 'title'
            { model: Showtime, attributes: ['time'] } // Include Showtime and select only 'time'
          ]
        },
        { model: Seat }
      ]
    });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings by user ID:", error);
    res.status(500).json({ message: "Error fetching bookings by user ID", error });
  }
};
