const express = require('express');
const router = express.Router();
const { uploadStaff } = require('../config/multerConfig');
const { registerStaff, loginStaff } = require('../controllers/staffController');


// Register Route
router.post('/register', uploadStaff.single('photo'), registerStaff);

// Login Route
router.post('/login', loginStaff);

module.exports = router;


