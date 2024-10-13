const express = require('express');
const { registerComplaint, getUserComplaints, getAllComplaints, addFeedback } = require('../controllers/complaintController');
const router = express.Router();

router.post('/', registerComplaint);
router.get('/', getUserComplaints);
router.get('/all', getAllComplaints); // Ensure this line correctly references the controller function
router.post('/:id/feedback', addFeedback);

module.exports = router;
