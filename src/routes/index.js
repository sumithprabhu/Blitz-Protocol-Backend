// routes/index.js

const express = require('express');
const userRoutes = require('./api/userRoutes');
const blitzRoutes = require('./api/blitzRoutes');
const graphql = require('./api/graphql');

const router = express.Router();

// RESTful routes
router.use('/user', userRoutes); // Now only affects /api/user routes
router.use('/blitz', blitzRoutes); // Now only affects /api/blitz routes

// GraphQL route with API key and contract address validation
// GraphQL route (e.g., `/api/graphql/:contractAddress`)
router.use('/v1', graphql);

module.exports = router;
