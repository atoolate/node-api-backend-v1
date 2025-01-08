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

const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Login failed',
                error: err ? err.message : info.message
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Login failed',
                    error: err.message
                });
            }

            const token = jwt.sign({
                uid: user._id,
                username: user.username,
                email: user.email
            }, secret);

            return res.json({
                status: 'success',
                data: {
                    token: token,
                }
            });
        });
    })(req, res);
};

// api/v1/admin/compare-password
const compareOldPassword = async (req, res) => {
    try {
        const { adminId, oldPassword } = req.body;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).send('The admin with the given ID was not found');
        }

        const isMatch = await admin.authenticate(oldPassword);
        if (isMatch) {
            res.json({ match: true });
        } else {
            res.json({ match: false });
        }
    } catch (err) {
        res.status(500).send('Error comparing password');
    }
};

module.exports = {
    signup,
    login,
    compareOldPassword
};



