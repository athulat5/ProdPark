// models/ROrder.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  rawMaterialId: { type: String, required: true },
  name: { type: String, required: true },
  cardDetails: {
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('ROrder', orderSchema);
