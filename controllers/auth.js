const Admin = require('../models/Admin');
const passport = require('../passport/passport');

const signup = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // create a new admin user
    const admin = new Admin({username: username});
    await admin.setPassword(password);
    await admin.save().then(result => {
       res.json({
            "status": "success"
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



