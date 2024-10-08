const express = require('express');
const router = express.Router();
const clientController = require('./../controllers/clientController');

const { uploadGeneral } = require('./../config/multerConfig');

router.post('/', uploadGeneral.fields([{ name: 'userPhoto' }, { name: 'idCardPhoto' }]), clientController.registerClient);
router.put('/approve/:id', clientController.approveClient); // Route for approval
router.put('/reject/:id', clientController.rejectClient);   // Route for rejection
router.get('/', clientController.getClients); // Route to get all clients
router.post('/login', clientController.loginClient);

module.exports = router;






