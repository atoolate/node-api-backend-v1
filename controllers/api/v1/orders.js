const Order = require('../../../models/Order');
// GET
// /api/v1/orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json({
            "status": "success",
            "data": {
                "orders": orders
            }
        });
    } catch (err) {
        res.status(500).send('Error getting orders');
    }
};

// /api/v1/orders/:id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send('The order with the given ID was not found');
        }
        return res.send(order);
    } catch (err) {
        res.status(500).send('Error getting order');
    }
};

// POST
const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        console.log('Incoming request body:', req.body); // Debug log
        console.log('Incoming POST data:', req.body);

        // Ensure shoeConfig is defined before calling forEach
        if (orderData.shoeConfig && orderData.shoeConfig.colors) {
            Object.values(orderData.shoeConfig.colors).forEach(color => {
                // ...existing code...
            });
        } else {
            throw new Error("Shoe configuration colors are missing");
        }

        const order = new Order(orderData);
        await order.save();
        console.log("Order created");

        // Emit WebSocket event for new order
        req.app.get('io').emit('newOrder', order);

        res.status(201).send(order);
    } catch (error) {
        console.error("Error creating order:", error);
        if (!res.headersSent) {
            res.status(500).send({ error: error.message });
        }
    }
};

// PUT
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).send('The order with the given ID was not found');
        }
        res.send(order);
    } catch (err) {
        res.status(500).send('Error updating order');
    }
};

// DELETE
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).send('The order with the given ID was not found');
        }
        res.send('Order deleted');
    } catch (err) {
        res.status(500).send('Error deleting order');
    }
};

module.exports.getAllOrders = getAllOrders;
module.exports.getOrderById = getOrderById;
module.exports.createOrder = createOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;