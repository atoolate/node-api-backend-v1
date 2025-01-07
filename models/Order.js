// Mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    shoeName: { type: String, required: true },
    user: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
    },
    shoeConfig: {
        size: { type: Number, required: true },
        initials: { type: String, required: false },
        colors: {
            inside: { type: String, required: true },
            laces: { type: String, required: true },
            outside_1: { type: String, required: true },
            outside_2: { type: String, required: true },
            outside_3: { type: String, required: true },
            sole_bottom: { type: String, required: true },
            sole_top: { type: String, required: true },
        },
        fabrics: {
            inside: { type: String, required: true },
            laces: { type: String, required: true },
            outside_1: { type: String, required: true },
            outside_2: { type: String, required: true },
            outside_3: { type: String, required: true },
            sole_bottom: { type: String, required: true },
            sole_top: { type: String, required: true },
        },
    },
    price: {
        basePrice: { type: Number, required: true },
        customizationFee: { type: Number, required: true },
        shippingCost: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    },
    status: { type: String, required: true },
    date: { type: Date, required: true }
});

// Model
const Order = mongoose.model('Order', orderSchema);

// Export
module.exports = Order;