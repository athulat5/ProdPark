// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   userName: { type: String, required: true },
  name: { type: String, required: true },
  houseName: { type: String, required: true },
//   address: { type: String, required: true },
  city: { type: String, required: true },
  locality: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
//   cardNumber: { type: String, required: true },
//   expiryDate: { type: String, required: true },
//   cvv: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
