const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  complaint: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'complaints' });

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
