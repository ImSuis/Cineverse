const Location = require("../model/locationModel");

// Create a new location
exports.createLocation = async (req, res) => {
  try {
    const { name, address } = req.body;
    const newLocation = await Location.create({
      name,
      address,
    });

    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error creating location:", error);
    res.status(500).json({ message: "Error creating location", error });
  }
};

// Get all locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Error fetching locations", error });
  }
};

// Get location by ID
exports.getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error("Error fetching location by ID:", error);
    res.status(500).json({ message: "Error fetching location by ID", error });
  }
};

// Update location by ID
exports.updateLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await location.update({
      name,
      address,
    });

    res.status(200).json(location);
  } catch (error) {
    console.error("Error updating location by ID:", error);
    res.status(500).json({ message: "Error updating location by ID", error });
  }
};

exports.deleteLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await location.destroy();
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error deleting location by ID:", error);
    res.status(500).json({ message: "Error deleting location by ID", error });
  }
};

