const Admin = require('../models/Admin');
const passport = require('../passport/passport');

const signup = async (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // create a new admin user
    const admin = new Admin({email: email, username: username});
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

module.exports = {
    signup,
};



