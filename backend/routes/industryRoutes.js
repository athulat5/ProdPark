const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');

module.exports = (upload) => {
  // router.get('/', industryController.getAllIndustries);
  router.post('/', upload.single('idCard'), industryController.registerIndustry);
  router.put('/:id', upload.single('idCard'), industryController.updateIndustry);
  router.delete('/:id', industryController.deleteIndustry);
 

  return router;
};
