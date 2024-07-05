// controllers/bookingController.js
const Booking = require("../model/bookingModel");
const Movie = require("../model/movieModel");
const User = require("../model/userModel");

exports.createBooking = async (req, res) => {
  try {
    const { userId, movieId, location, date, showtime, seats, totalPrice } = req.body;

    const booking = await Booking.create({
      userId,
      movieId,
      location,
      date,
      showtime,
      seats,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.findAll({
      where: { userId },
      include: [Movie],
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
