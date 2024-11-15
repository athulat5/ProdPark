const express = require('express');
const router = express.Router();
const ROrder = require('../models/rorder');

// POST endpoint to save payment details
router.post('/', async (req, res) => {
  try {
    const {name, rawMaterialId, cardDetails } = req.body;

    // Create a new order with the received data
    const newOrder = new ROrder({
      rawMaterialId,
      name,
      cardDetails,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Payment successful!' });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ message: 'Payment failed. Please try again.' });
  }
});

module.exports = router;
