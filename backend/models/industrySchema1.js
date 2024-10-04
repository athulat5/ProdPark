const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const industry1Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  idCard: {
    type: String,
    required: true
  },
  landSquareFeet: {
    type: Number,
    required: true
  },
  industryDescription: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'industry1' });

const Industry1 = mongoose.model('Industry1', industry1Schema);
module.exports = Industry1;
