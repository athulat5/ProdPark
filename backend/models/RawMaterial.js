const mongoose = require('mongoose');

const rawMaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const RawMaterial = mongoose.model('RawMaterial', rawMaterialSchema);

module.exports = RawMaterial;
