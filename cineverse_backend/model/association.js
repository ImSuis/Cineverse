const User = require('./userModel');
const Schedule = require('./scheduleModel');
const Seat = require('./seatModel');
const Movie = require('./movieModel');
const Location = require('./locationModel');
const Showtime = require('./showtimeModel');
const ScheduleSeat = require('./scheduleSeatModel'); // Correct import path for ScheduleSeat


// Schedule and Movie
Movie.hasMany(Schedule);
Schedule.belongsTo(Movie);

// Schedule and Location
Location.hasMany(Schedule);
Schedule.belongsTo(Location);

// Schedule and Showtime
Showtime.hasMany(Schedule);
Schedule.belongsTo(Showtime);

// Schedule and Seat (Many-to-Many)
Schedule.belongsToMany(Seat, { through: ScheduleSeat });
Seat.belongsToMany(Schedule, { through: ScheduleSeat });


