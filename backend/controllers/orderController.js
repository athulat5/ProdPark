// controllers/orderController.js
const express = require('express');
const Order = require('../models/Porder');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

exports.createOrder = async (req, res) => {
  try {
    const { productId, userName, name, houseName, address, city, locality, pincode, cardNumber, expiryDate, cvv , phone} = req.body;

    const newOrder = new Order({
      productId,
    //   userName,
      name,
      houseName,
    //   address,
      city,
      locality,
      pincode,
      phone,
    //   cardNumber,
    //   expiryDate,
    //   cvv,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
   
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getClientOrders = async (req, res) => {
    try {
      const clientId = req.user.id; // Assuming req.user contains logged-in user info from auth middleware
      const orders = await Order.find({ clientId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching client orders' });
    }
  };

  router.get('/orders', authMiddleware, async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.user._id });  // Filter orders by the logged-in user
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });


// Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Fetch order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('productId');
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

