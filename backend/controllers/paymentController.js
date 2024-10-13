const Payment = require('../models/payment');

// Function to handle payment processing
exports.processPayment = async (req, res) => {
  const { userName, address, cardNumber, expiryDate, cvv, productId } = req.body;
console.log(req.body);
  try {
    const newPayment = new Payment({
      userName,
      address,
      cardNumber,
      expiryDate,
      cvv,
      productId
    });

    await newPayment.save();

    res.status(201).json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
};

