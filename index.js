const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const JobRoutes = require("./Routes/JobRoutes");
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const eventRoutes = require('./Routes/EventRoutes'); // Import event routes
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

// Define allowed origins for CORS
const allowedOrigins = ['https://alfarah-client.vercel.app'];

// CORS middleware configuration
app.use(cors({
    origin: allowedOrigins,  // Allow requests only from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    preflightContinue: false,  // Let the CORS middleware handle the OPTIONS request
    optionsSuccessStatus: 200,  // For legacy browsers
}));

// Handle preflight requests
app.options('*', cors());

// Static file configuration
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parser middleware
app.use(bodyParser.json());

// Route definitions
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

app.use(express.static('uploads'));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use("/jobs", JobRoutes);
app.use('/api/events', eventRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
