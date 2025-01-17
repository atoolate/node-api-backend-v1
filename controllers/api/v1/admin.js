const Admin = require('../../../models/Admin');
const bcrypt = require('bcrypt');

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



// PUT
// api/v1/admin/:id
const updateAdmin = async (req, res) => {
    try {
        const { username, email, newPassword, confirmNewPassword } = req.body;
        const updateData = {};

        if (username) updateData.username = username;
        if (email) updateData.email = email;

        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).send('The admin with the given ID was not found');
        }

        console.log('Admin found:', admin); // Log the admin object

        if (newPassword && confirmNewPassword) {
            // console.log('New Password:', newPassword); // Log the new password
            // console.log('Confirm New Password:', confirmNewPassword); // Log the confirm new password

            if (newPassword !== confirmNewPassword) {
                return res.status(400).send('New passwords do not match');
            }

            await admin.setPassword(newPassword); // Use setPassword method to hash and set the new password
            await admin.save(); // Save the updated admin with the new password
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.send(updatedAdmin);
    } catch (err) {
        console.error('Error updating admin:', err); // Add detailed error logging
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