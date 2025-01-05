const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passPortLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    adress: {
        street: String,
        city: String,
        zip: String,
        country: String
    }
});

userSchema.plugin(passPortLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
