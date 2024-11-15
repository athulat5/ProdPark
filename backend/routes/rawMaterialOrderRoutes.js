// // routes/rawMaterialOrderRoutes.js
// const express = require('express');
// const RawMaterialOrder = require('../models/rawMaterialOrder');
// const router = express.Router();

// // Place an order for raw materials
// router.post('/order', async (req, res) => {
//   try {
//     const { userId, rawMaterialId, quantity, totalPrice, deliveryAddress } = req.body;

//     const newOrder = new RawMaterialOrder({
//       userId,
//       rawMaterialId,
//       quantity,
//       totalPrice,
//       deliveryAddress,
//     });

//     await newOrder.save();
//     res.status(201).json({ message: 'Order placed successfully', order: newOrder });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Failed to place order' });
//   }
// });

// // Get all orders
// router.get('/orders', async (req, res) => {
//   try {
//     const orders = await RawMaterialOrder.find().populate('rawMaterialId').populate('userId');
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ message: 'Failed to fetch orders' });
//   }
// });

// // Edit an order (status update, for example)


// router.put('/orders/:id', async (req, res) => {
//   try {
//     const { status } = req.body;  // Updating the order status
//     const updatedOrder = await RawMaterialOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
//     res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ message: 'Failed to update order' });
//   }
// });

// // Delete an order
// router.delete('/orders/:id', async (req, res) => {
//   try {
//     await RawMaterialOrder.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     res.status(500).json({ message: 'Failed to delete order' });
//   }
// });

// module.exports = router;
