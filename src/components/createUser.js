const mongoose = require('mongoose');
const User = require('../models/User');
const generateApiKey = require('../utils/generateAPIKey');
require('dotenv').config();

const createUser = async (walletAddress) => {
    // Check if the user already exists
    let user = await User.findById(walletAddress);

    if (user) {
        console.log(`User with wallet address ${walletAddress} already exists with API key: ${user.apiKey}`);
        return { apiKey: user.apiKey, message: 'User already exists' };
    }

    // If user does not exist, create a new one
    const apiKey = generateApiKey();

    user = new User({
        _id: walletAddress,  // Using wallet address as _id
        apiKey
    });

    await user.save();
    console.log(`New user with wallet address ${walletAddress} created with API key: ${apiKey}`);
    return { apiKey, message: 'New user created' };
};

module.exports = createUser;
