const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const { registerStaff } = require('../controllers/staffController');

// Register Route
router.post('/register', upload.single('photo'), registerStaff);

module.exports = router;
