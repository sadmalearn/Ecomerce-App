const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    email : {
        type : String,
        unique : true
    },
    otp :{
        type : String
    },
    createdAt :{
        type : Date
    },
    expiresAt :{
        type : Date
    }
})

module.exports = mongoose.model("OTP", otpSchema);