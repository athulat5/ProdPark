// models/rawMaterialOrder.js
const mongoose = require('mongoose');

const rawMaterialOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
  rawMaterialId: { type: mongoose.Schema.Types.ObjectId, ref: 'RawMaterial', required: true },  // Reference to RawMaterial model
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },  // Order status (Pending, Completed, Cancelled)
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: { 
    companyName: { type: String, required: true },
    sector: { type: String, required: true },
    bulding: { type: String, required: true },
  },
});

module.exports = mongoose.model('RawMaterialOrder', rawMaterialOrderSchema);
