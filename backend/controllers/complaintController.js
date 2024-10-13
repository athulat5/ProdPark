const Complaint = require('../models/complaintModel');

// Register Complaint
exports.registerComplaint = async (req, res) => {
  try {
    const newComplaint = new Complaint({
      username: req.user.username,
      complaint: req.body.complaint
    });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    console.error('Error registering complaint:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get All Complaints for User
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ username: req.user.username });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Complaints for Admin
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Feedback to Complaint
exports.addFeedback = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    complaint.feedback = req.body.feedback;
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
