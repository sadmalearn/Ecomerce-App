const express = require('express')
const router = express.Router();
const {createProduct,welcome,getAllProduct,deleteProductById,updateProductDetails,getProductById} = require('../Controller/productController')


router.post('/createProduct', createProduct)
router.get('/welcome', welcome)
router.get('/getAllProduct', getAllProduct)
router.get('/getProductById/:id', getProductById)
router.delete('/deleteProductById/:id',deleteProductById)
router.put('/updateProductDetails/:id',updateProductDetails)

module.exports = router