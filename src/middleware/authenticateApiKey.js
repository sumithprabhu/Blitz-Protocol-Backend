const User = require('../models/User');

// Middleware to authenticate the API key
const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.header('x-api-key'); // Accessing the API key from headers

  if (!apiKey) {
    return res.status(403).json({ error: 'API key is required.' });
  }

  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(403).json({ error: 'Invalid API key.' });
    }
    req.user = user; // Store user in request for downstream use
    next();
  } catch (error) {
    console.error('Error authenticating API key:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = authenticateApiKey;
