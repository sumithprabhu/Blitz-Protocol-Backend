// routes/userRoutes.js

const express = require('express');
const createUser = require('../../components/createUser');

const router = express.Router();

router.post('/create', async (req, res) => {
    const { walletAddress } = req.body;
    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required.' });
    }
    try {
        const { apiKey, message } = await createUser(walletAddress);
        return res.status(200).json({ message, apiKey });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
