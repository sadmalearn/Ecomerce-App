const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required:true
    },
    mobile : {
        type : String,
        required:true
    },
    userName : {
        type : String,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true
    },
    role : {
        type : String,
        required:true
    }
})

module.exports = mongoose.model("UserTable",userSchema)