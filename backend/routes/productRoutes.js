const express = require('express');
const { addProduct, getAllProducts, buyProduct } = require('../controllers/productController');
const upload = require('../config/config1'); // Ensure this path correctly points to multerConfig
const router = express.Router();

router.post('/', upload.single('image'), addProduct);  // Ensure 'image' field is used
router.get('/', getAllProducts);
router.post('/:id/buy', buyProduct);

module.exports = router;
