const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../../../controllers/api/v1/admin');
const authController = require('../../../controllers/auth');

// Routes
// GET
router.get('/', passport.authenticate('jwt', { session: false }), adminController.getAllAdmins);
router.get('/:id', passport.authenticate('jwt', { session: false }), adminController.getAdminById);

// POST
// router.post('/signup', authController.signup);
router.post('/login', authController.login);

// PUT
router.put('/:id', passport.authenticate('jwt', { session: false }), adminController.updateAdmin);

// DELETE
router.delete('/:id', passport.authenticate('jwt', { session: false }), adminController.deleteAdmin);

module.exports = router;
