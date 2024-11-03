const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        minLegth: 6
    },
    userId: {
        type: String,
        require: true,
        unique: true
    },
    userType: {
        type: String,
        default: "Customer",
        emun: ["Customer", "Admin"]
    },

});

module.exports = mongoose.model('User', userSchema);