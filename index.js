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
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

app.use(express.static('uploads'));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use("/jobs", JobRoutes);
app.use('/api/events', eventRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
