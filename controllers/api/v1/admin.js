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


// PUT
// api/v1/admin/:id
const updateAdmin = async (req, res) => {
    try {
        const { username, email, oldPassword, newPassword, confirmNewPassword } = req.body;
        const updateData = {};

        if (username) updateData.username = username;
        if (email) updateData.email = email;

        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).send('The admin with the given ID was not found');
        }

        if (oldPassword && newPassword && confirmNewPassword) {
            const isMatch = await admin.comparePassword(oldPassword);
            if (!isMatch) {
                return res.status(400).send('Old password is incorrect');
            }
            if (newPassword !== confirmNewPassword) {
                return res.status(400).send('New passwords do not match');
            }
            updateData.password = newPassword;
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.send(updatedAdmin);
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