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
        size: {
            type: Number,
            required: true,
        },
        initials: String,
        colors: {
            inside: String,
            laces: String,
            outside_1: String,
            outside_2: String,
            outside_3: String,
            sole_bottom: String,
            sole_top: String,
        },
        fabrics: {
            inside: String,
            laces: String,
            outside_1: String,
            outside_2: String,
            outside_3: String,
            sole_bottom: String,
            sole_top: String,
        },
    },
});

// Model
const Order = mongoose.model('Order', orderSchema);

// Export
module.exports = Order;