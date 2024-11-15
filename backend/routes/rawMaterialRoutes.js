const express = require('express');
const router = express.Router();
const { addRawMaterial } = require('../controllers/rawMaterialController');

// Route to add raw material
router.post('/rawMaterials', addRawMaterial);

module.exports = router;
