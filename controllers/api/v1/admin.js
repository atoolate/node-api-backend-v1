const Admin = require('../../../models/Admin');

// GET
// api/v1/admin
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.json({
            "status": "success",
            "data": {
                "admins": admins
            }
        });
    } catch (err) {
        res.status(500).send('Error getting admins');
    }
}

// api/v1/admin/:id
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).send('The admin with the given ID was not found');
        }
        return res.send(admin);
    } catch (err) {
        res.status(500).send('Error getting admin');
    }
}


// POST
// api/v1/admin/signup
const signup = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        const admin = new Admin({username: username, email: email});
        await admin.setPassword(password);
        const result = await admin.save();
        
        const token = jwt.sign({
            uid: result._id,
            username: result.username,
            email: result.email
        }, 'extrapuntjevoordemoeite');
        
        res.json({
            "status": "success",
            "data": {
                "token": token,
            }
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": error
        });
    }
}


// PUT
// api/v1/admin/:id
const updateAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updateData = {};

        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        const admin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!admin) {
            return res.status(404).send('The admin with the given ID was not found');
        }
        res.send(admin);
    } catch (err) {
        res.status(500).send('Error updating admin');
    }
};

// DELETE
// api/v1/admin/:id
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).send('The admin with the given ID was not found');
        }
        res.send('Admin deleted');
    } catch (err) {
        res.status(500).send('Error deleting admin');
    }
};

// export module
module.exports = {
    getAllAdmins,
    getAdminById,
    
    updateAdmin,
    deleteAdmin
};