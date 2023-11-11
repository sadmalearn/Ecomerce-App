const mongoose = require('mongoose')


const cartSchema = mongoose.Schema({
    productCode : {
        type : String,
        required : true
    },
    quantity : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    productType : {
        type : String,
        required : true
    },
    totalPrice : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model('Cart',cartSchema)