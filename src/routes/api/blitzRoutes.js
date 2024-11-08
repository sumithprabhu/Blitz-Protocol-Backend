// routes/blitzRoutes.js

const express = require('express');
const Blitz = require('../../models/Blitz');
const initializeEventStorage = require('../../components/initializeEventStorage');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { contractAddress, contractABI, protocolName, imageUrl } = req.body;
    if (!contractAddress || !contractABI || !protocolName) {
        return res.status(400).json({ error: 'Contract address, protocol name, and ABI are required.' });
    }
    try {
        await initializeEventStorage(contractAddress, contractABI);
        const newBlitz = new Blitz({ protocolName, contractAddress, imageUrl });
        await newBlitz.save();
        return res.status(200).json({
            message: 'Protocol registered and event storage initialized successfully.',
            _id: newBlitz._id
        });
    } catch (error) {
        console.error('Error registering protocol:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        // Get page and limit from query parameters or set default values
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch the paginated data
        const blitzRecords = await Blitz.find({})
            .skip(skip)
            .limit(limit)
            .lean();

        // Count total number of documents
        const totalDocuments = await Blitz.countDocuments({});
        const totalPages = Math.ceil(totalDocuments / limit);

        // Send response with paginated data and additional pagination information
        return res.status(200).json({
            blitzRecords,
            pagination: {
                totalDocuments,
                totalPages,
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        console.error('Error fetching Blitz records:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/:id', async (req, res) => {
    try {
      const blitzId = req.params.id;
  
      // Find the Blitz entry by _id
      const blitzEntry = await Blitz.findById(blitzId);
  
      // If the entry is not found, return a 404 response
      if (!blitzEntry) {
        return res.status(404).json({ message: 'Blitz entry not found' });
      }
  
      // Return the found entry
      return res.status(200).json(blitzEntry);
    } catch (error) {
      console.error('Error fetching Blitz entry:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
