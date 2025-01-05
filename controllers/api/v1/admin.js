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
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
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