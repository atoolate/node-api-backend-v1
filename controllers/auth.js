const Admin = require('../models/Admin');
const passport = require('../passport/passport');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email; // Add this line

    // create a new admin user
    const admin = new Admin({username: username, email: email}); // Update this line
    await admin.setPassword(password);
    await admin.save().then(result => {
        const token = jwt.sign({
            uid: result._id,
            username: result.username
            
        }, 'extrapuntjevoordemoeite');
        
       res.json({
            "status": "success",
            "data": {
                "token": token,
            }
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });

}

const login = async (req, res, next) => {
    const admin = await Admin.authenticate()(req.body.username, req.body.password).then(result => {
        res.json({
            "status": "success",
            "data": {
                "message": "Admin logged in",
            }
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });
}

module.exports = {
    signup,
    login
};



