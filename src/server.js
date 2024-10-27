// Import necessary modules
require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const cors = require('cors'); // Enable CORS
const connectDB = require('./config/database'); // Import database connection
const routes = require('./routes'); // Import routes

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Apply middleware
app.use(cors({ origin: 'https://blitzprotocol.org', credentials: true })); // Set CORS policy
app.use(express.json({ limit: '50mb' })); // Parse JSON with 50MB limit
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Parse URL-encoded with limit

// Connect to the database
connectDB();

// Set up routes
app.use('/api', routes); // Use the routes from the routes folder

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
