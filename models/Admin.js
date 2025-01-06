const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        select: false // Ensure hash is not selected by default
    },
    salt: {
        type: String,
        select: false // Ensure salt is not selected by default
    }
});

adminSchema.plugin(passportLocalMongoose, {
    usernameField: 'email', // Use email as the username field
    hashField: 'hash', // Use hash as the hash field
    saltField: 'salt' // Use salt as the salt field
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;