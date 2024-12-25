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
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use("/jobs", JobRoutes);
app.use('/api/events', eventRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

module.exports = app;
