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

const allowedOrigins = ['https://alfarah-client.vercel.app'];
app.use(cors({
    origin: allowedOrigins,
   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use("/jobs", JobRoutes);
app.use('/api/events', eventRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

module.exports = app;
