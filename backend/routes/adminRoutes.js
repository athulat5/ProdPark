const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController');

// Login Route
router.post('/login', loginAdmin);

module.exports = router;
