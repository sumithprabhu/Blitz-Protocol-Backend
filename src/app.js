const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const blitzRoutes = require('./routes/api/blitzRoutes');
const userRoutes = require('./routes/api/userRoutes');

require('dotenv').config();

const app = express();

// Database connection
connectDB();

// CORS Configuration
app.use(cors({
    origin: 'https://blitzprotocol.org',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(requestLogger);

// Routes
app.use('/api/blitz', blitzRoutes); // Blitz routes
app.use('/api/user', userRoutes); // User routes

// Error handling middleware
app.use(errorHandler);

module.exports = app;
