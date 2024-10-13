const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true // Field to store image filename
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
