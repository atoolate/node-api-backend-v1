const express = require('express');
const router = express.Router();
const adminController = require('../../../controllers/api/v1/admin');
const authController = require('../../../controllers/auth');

// Routes
// GET
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);

// POST
router.post('/signup', authController.signup);

// PUT
router.put('/:id', adminController.updateAdmin);

// DELETE
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
