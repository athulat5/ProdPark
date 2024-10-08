const express = require('express');
const router = express.Router();
const industry1Controller = require('../controllers/industry1Controller');

module.exports = (upload) => {
  // Assuming upload is the multer middleware for handling file uploads
  router.get('/', industry1Controller.getAllIndustryRequests);
  router.post('/', upload.single('idCard'), industry1Controller.registerIndustry);
  router.post('/approve/:id', industry1Controller.approveIndustry);
  router.post('/login', industry1Controller.loginIndustry);
  


  router.put('/:id', upload.single('idCard'), industry1Controller.updateIndustry);
  router.delete('/:id', industry1Controller.deleteIndustry);

  return router;
};
