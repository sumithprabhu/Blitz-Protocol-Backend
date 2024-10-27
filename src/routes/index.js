const express = require('express');
const router = express.Router();

// Import specific route modules
const userRoutes = require('./userRoutes');
const blitzRoutes = require('./blitzRoutes');
const graphQLRoutes = require('./graphQLRoutes');

// Set up route modules
router.use('/users', userRoutes); // User-related routes, e.g., /api/users
router.use('/blitz', blitzRoutes); // Blitz-related routes, e.g., /api/blitz
router.use('/graphql', graphQLRoutes); // GraphQL routes, e.g., /api/graphql

module.exports = router;
