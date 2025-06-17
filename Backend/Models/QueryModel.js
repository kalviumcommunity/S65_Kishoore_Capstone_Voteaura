const mongoose = require('mongoose')


const QuerySchema =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true

    },
    solved:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("Query",QuerySchema)