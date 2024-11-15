// routes/orderRoutes.js
const express = require('express');
const { createOrder, getClientOrders } = require('../controllers/orderController');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/api/orders', createOrder);
router.get('/client-orders', getClientOrders);
router.get('/orders', authMiddleware, async (req, res) => {
    try {
      // Use req.user to get the client ID from the decoded token
      const clientId = req.user.id;
      
      // Fetch orders associated with the client
      const orders = await Order.find({ clientId }); 
      res.status(200).json(orders); // Send orders as response
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  });

  router.post('/order', (req, res) => {
  const { phone, message } = req.body;

  sendOrderConfirmation(phone, message); // Call the function to send the SMS

  res.status(200).json({ message: 'Order placed and SMS sent' });
});

module.exports = router;
