const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');

// Route to handle payment saving
router.post('/payments', processPayment);

module.exports = router;
