const crypto = require('crypto');

// Function to generate a unique API key
const generateApiKey = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = generateApiKey;
