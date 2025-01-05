const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/api/v1/users');

// Routes
// GET
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

// POST
router.post('/', usersController.createUser);

// PUT
router.put('/:id', usersController.updateUser);

// DELETE
router.delete('/:id', usersController.deleteUser);

module.exports = router;
