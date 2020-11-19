const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },

    trackingCode : {
        type: String,
        required: true,
    },

    visits :{
        type: Number,
        default: 1
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    lastVisit: {
        type: Date
    }

})

const User = mongoose.model('user', UserSchema)
module.exports = User;