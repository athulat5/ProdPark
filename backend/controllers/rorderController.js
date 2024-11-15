const Order = require('../models/rorder');

// Controller function to create a new order
// exports.createOrder = async (req, res) => {
//   const { rawMaterialId, industry, quantity, totalPrice, cardDetails } = req.body;

//   try {
//     const newOrder = new Order({
//       rawMaterialId,
//       industry,
//     //   quantity,
//     //   totalPrice,
//       cardDetails,
//       status: 'Pending',
//       orderDate: new Date(),
//     });

//     await newOrder.save();

//     res.status(201).json({ message: 'Payment successful!', order: newOrder });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.createOrder = async (req, res) => {
    try {
      const { rawMaterialId, cardDetails } = req.body;
  
      const order = new Order({
        rawMaterialId,
        industry: "Industry Name", // Replace this or fetch dynamically if required
        quantity: 1, // Default or add user input if needed
        totalPrice: 100, // Replace with actual price from raw material if needed
        cardDetails,
      });
  
      await order.save();
      res.status(201).json({ message: 'Payment successful!', order });
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  };
  
