const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productCode: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    //   productImage : {
    //     base64: String,
    //     contentType: String, // Content type of the image (e.g., 'image/jpeg', 'image/png')
    //     filename: String, 
    //   },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    color: [{
        type: String,
        required: true
    }],
    sizes: [{
        type: String,
        required: true
    }],
    brandName: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    }
}
)

module.exports = mongoose.model("Products", productSchema);