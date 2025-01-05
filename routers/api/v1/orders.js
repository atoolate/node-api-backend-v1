const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controller
const ordersController = require('../../../controllers/api/v1/orders');

// get all orders
router.get('/', passport.authenticate('jwt', { session: false }), ordersController.getAllOrders);

// get order by id
router.get('/:id', passport.authenticate('jwt', { session: false }), ordersController.getOrderById);

// POST method route
router.post('/', ordersController.createOrder);

// PUT method route
router.put('/:id', passport.authenticate('jwt', { session: false }), ordersController.updateOrder);

// DELETE method route
router.delete('/:id', passport.authenticate('jwt', { session: false }), ordersController.deleteOrder);

module.exports = router;
