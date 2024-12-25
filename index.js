const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const JobRoutes = require("./Routes/JobRoutes");
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const eventRoutes = require('./Routes/EventRoutes'); // Import event routes
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

<<<<<<< HEAD
// Allowed origins based on environment
const allowedOrigins = [
    "http://localhost:3000", // Development frontend
    "https://alfarah-client.vercel.app" // Production frontend
];

// CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Handle preflight requests
app.options('*', cors());

// Test route
=======
// Define allowed origins for CORS
const allowedOrigins = ['https://alfarah-client.vercel.app'];

// CORS middleware configuration
app.use(cors({
    origin: allowedOrigins,  // Allow requests only from the listed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With', 'Access-Control-Allow-Headers'], // Allow these headers
    credentials: true,  // Allow cookies if needed
    preflightContinue: false,  // Let CORS handle preflight OPTIONS requests
    optionsSuccessStatus: 200  // Handle successful preflight responses
}));


// Handle preflight OPTIONS request
app.options('*', cors());

// Static file configuration
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parser middleware
app.use(bodyParser.json());

// Route definitions
>>>>>>> d1462acf8376e796d242f1331d4be9313d6f3c3d
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

<<<<<<< HEAD
// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Routes
=======
app.use(express.static('uploads'));
>>>>>>> d1462acf8376e796d242f1331d4be9313d6f3c3d
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use("/jobs", JobRoutes);
app.use('/api/events', eventRoutes);

<<<<<<< HEAD
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
=======
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
>>>>>>> d1462acf8376e796d242f1331d4be9313d6f3c3d
});

module.exports = app;
