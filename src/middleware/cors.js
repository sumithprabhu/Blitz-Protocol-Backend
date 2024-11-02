const cors = require('cors');

const corsOptions = {
  origin: 'https://blitzprotocol.org',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
