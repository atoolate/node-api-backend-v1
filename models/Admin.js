const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
});

adminSchema.plugin(passportLocalMongoose, { usernameField: 'username' }); // Configure usernameField

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;