const RawMaterial = require('../models/RawMaterial');
const path = require('path');

// Handle new raw material creation
exports.createRawMaterial = async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const imageUrl = req.file ? `/uploads/rawmaterial/${req.file.filename}` : null; // Get image path if uploaded

    const newRawMaterial = new RawMaterial({
      name,
      description,
      quantity,
      price,
      imageUrl,
    });

    await newRawMaterial.save();
    res.status(201).json({ message: 'Raw material added successfully', rawMaterial: newRawMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding raw material' });
  }
};

// Fetch all raw materials
exports.getRawMaterials = async (req, res) => {
  try {
      
    const rawMaterials = await RawMaterial.find();
    res.status(200).json(rawMaterials);
  } catch (error) {
    console.error('Error fetching raw materials:', error);
    res.status(500).json({ message: 'Failed to fetch raw materials' });
  }
};

// Handle raw material purchase (dummy route for now)
exports.buyRawMaterial = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const rawMaterial = await RawMaterial.findById(productId);
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }

    if (rawMaterial.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    rawMaterial.quantity -= quantity; // Decrease the stock
    await rawMaterial.save();

    res.status(200).json({ message: 'Make the Payment', rawMaterial });
  } catch (error) {
    console.error('Error buying raw material:', error);
    res.status(500).json({ message: 'Failed to purchase raw material' });
  }
};

exports.getRawMaterialById = async (req, res) => {
  try {
    const rawMaterial = await RawMaterial.findById(req.params.id);
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }
    res.json(rawMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching raw material', error });
  }
};

