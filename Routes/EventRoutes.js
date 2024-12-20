const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/EventController');
const multer = require('multer');

// Set up multer upload for the create and update routes
const upload = multer({ dest: 'uploads/' });

// Route to get all events
router.get('/', eventController.getAllEvents);

// Route to get a specific event by id
router.get('/:id',  eventController.getEventById);

// Route to create a new event
router.post('/create',  upload.single('image'), eventController.createEvent);

// Route to update an event by id
router.put('/:id', upload.single('image'), eventController.updateEvent);

// Route to delete an event by id
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
