const Admin = require('../models/Admin');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const signup = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email; // Add this line

        // create a new admin user
        const admin = new Admin({username: username, email: email}); // Update this line
        await admin.setPassword(password);
        const result = await admin.save();
        
        const token = jwt.sign({
            uid: result._id,
            username: result.username,
            email: result.email
        }, secret);
        
        res.json({
            "status": "success",
            "data": {
                "token": token,
            }
        });
    } catch (error) {
        console.error("Signup error:", error); // Add detailed error logging
        res.json({
            "status": "error",
            "message": error.message // Update to send error message
        });
    }
}

const login = async (req, res, next) => {
    try {
        const result = await Admin.authenticate()(req.body.username, req.body.password);
        if (!result.user) {
            return res.json({
                "status": "failed",
                "message": "Login failed"
            });
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username,
            email: result.user.email 
        }, secret);

        return res.json({
            "status": "success",
            "data": {
                "token": token,
            }
        });
    } catch (error) {
        console.error("Login error:", error); // Add detailed error logging
        res.json({
            "status": "error",
            "message": error.message // Update to send error message
        });
    }
}

module.exports = {
    signup,
    login
};



