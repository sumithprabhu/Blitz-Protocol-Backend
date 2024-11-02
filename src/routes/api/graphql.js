// routes/api/graphql.js

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../../graphql/schema');
const User = require('../../models/User');

const router = express.Router();

router.use('/:contractAddress', async (req, res, next) => {
    const apiKey = req.headers['authorization']; // API key from headers
    const { contractAddress } = req.params; // Contract address from URL params

    if (!apiKey || !contractAddress) {
        return res.status(403).json({ error: 'Forbidden: API key and Contract Address are required.' });
    }

    try {
        // Verify the API key
        const user = await User.findOne({ apiKey });
        if (!user) {
            return res.status(403).json({ error: 'Forbidden: Invalid API Key.' });
        }

        // Attach the contract address to the GraphQL context
        req.contractAddress = contractAddress;
        next();
    } catch (error) {
        console.error('Error verifying API key:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}, graphqlHTTP((req) => ({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development', // Enable GraphiQL in development only
    context: {
        contractAddress: req.contractAddress,
    }
})));

module.exports = router;
