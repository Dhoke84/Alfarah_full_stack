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
    origin: allowedOrigins,  // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow cookies if necessary
    preflightContinue: false,  // Let CORS handle OPTIONS requests
    optionsSuccessStatus: 200,  // Some browsers (IE) need this for successful preflight
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
