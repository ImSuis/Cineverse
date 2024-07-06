const Booking = require("../model/bookingModel");
const Movie = require("../model/movieModel");
const Schedule = require("../model/scheduleModel");
const User = require("../model/userModel");

exports.createBooking = async (req, res) => {
  try {
    const { scheduleId, seats, totalPrice } = req.body;
    const userId = req.user.id;

    const booking = await Booking.create({
      UserId: userId,
      ScheduleId: scheduleId,
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
    const userId = req.user.id;
    const bookings = await Booking.findAll({
      where: { UserId: userId },
      include: [Schedule],
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
