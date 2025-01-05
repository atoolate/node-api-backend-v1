// Mongoose
const mongoose = require('mongoose');
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
    price: {
        basePrice: Number,
        customizationFee: Number,
        shippingCost: Number,
        totalPrice: Number
    },
    status: String,
    date: Date,
});

// Model
const Order = mongoose.model('Order', orderSchema);

// Export
module.exports = Order;