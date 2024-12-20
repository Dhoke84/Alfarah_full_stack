const Event = require('../Models/Event'); // Import the Event model
const path = require('path');

// Middleware for handling file uploads
const multer = require('multer');

// Set up multer for storing uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Define where to store the file
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, Date.now() + ext); // Give the file a unique name
  }
});

const upload = multer({ storage: storage });

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { heading, location, description } = req.body;

    // Ensure the image is uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Create a new event
    const newEvent = new Event({ heading, location, description, image });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const { heading, location, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // New image if uploaded

    // Find the event and update
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { heading, location, description, image },
      { new: true } // Return the updated document
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
