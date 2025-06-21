const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state:{
        type:String,
        required:true
    },
    district: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', AdminSchema)
