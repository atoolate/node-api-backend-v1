// Mongoose
const mongoose = require('mongoose');
const { string } = require('three/tsl');
const { post } = require('../routers/api/v1/orders');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    shoeName: String,
    user: {
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        address: String,
        postalCode: String,
        city: String,
    },
    shoeConfig: {
        size: Number,
        initials: String,
        colors: [String],
        fabrics: [String],
    },
});

// Model
const Order = mongoose.model('Order', orderSchema);

// Export
module.exports = Order;