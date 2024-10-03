const express = require('express');
const router = express.Router();
const { uploadGeneral } = require('../config/multerConfig');
const { registerIndustry } = require('../controllers/industryController');

// Register Route
router.post('/register', uploadGeneral.single('idCard'), registerIndustry);

module.exports = router;
