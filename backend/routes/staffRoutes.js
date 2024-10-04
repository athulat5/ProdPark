const express = require('express');
const router = express.Router();
const { uploadStaff } = require('../config/multerConfig');
const { registerStaff, loginStaff, getAllStaff, updateStaff, deleteStaff} = require('../controllers/staffController');


// Register Route
router.post('/register', uploadStaff.single('photo'), registerStaff);

// Login Route
router.post('/login', loginStaff);

router.get('/', getAllStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;


