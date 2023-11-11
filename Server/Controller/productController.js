const productCollection = require('../Models/ProductSchema')


const welcome = async(req,res) =>{
    res.send({ message: 'Welcome to Our App.....',status : 200 })
    console.log('welcome');
}


const createProduct = async(req, res) =>{
    const {productCode, productName, productDesc,productType,productSubType, price, sizes, color, quantity, brandName, discount} = req.body
    const isProductAvailable = await productCollection.findOne({ productCode })
    if(isProductAvailable){
        res.send({status: 208, message: 'Product already available' })
    }else{
        const productCreate = await productCollection.create({
            productCode, productName, productDesc,productType,productSubType, price, sizes, color, quantity, brandName, discount
        })
        if (productCreate) {
            res.send({ status: 200, success: true, message: 'Product Added Succesfully !' })
        } else {
            res.send({ status: 400, success: false, message: 'Something Went Wrong' })
        }
    }
}


const getAllProduct = async (req,res) =>{
    const allProduct = await productCollection.find().sort({productCode : 1})
    if(allProduct){
        res.send({ data:allProduct,success: true, message: 'Product Added Succesfully !' })
    }else{
        res.send({ status: 400, success: false, message: 'Something Went Wrong' })
    }
}


const deleteProductById = async (req, res) =>{
    const { id } = req.params;
    const deleteProduct = await productCollection.deleteOne({ _id: id });   
    if(deleteProduct){
        const allProduct = await productCollection.find().sort({productCode : 1})
        res.send({ data:allProduct,success: true, message: 'Product Deleted Succefully !' })
    }else{
        res.send({ status: 400, success: false, message: 'Something Went Wrong' })
    }
}


const getProductById = async (req, res) =>{
    const { id } = req.params;
    const ProductDetail = await productCollection.findById({ _id: id });   
    if(ProductDetail){
        res.send({ data:ProductDetail,success: true, message: 'Product Details!' })
    }else{
        res.send({ status: 400, success: false, message: 'Something Went Wrong' })
    }
}


const updateProductDetails = async (req, res) =>{
    const {productCode, productName, productDesc,productType,productSubType, price, sizes, color, quantity, brandName, discount} = req.body
    const { id } = req.params;
    const updateProduct = await productCollection.findByIdAndUpdate(
        id,
        {productCode, productName, productDesc,productType,productSubType, price, sizes, color, quantity, brandName, discount},
        { new: true }
    );
    if (updateProduct) {
        const allProduct = await productCollection.find().sort({productCode : 1})
        res.send({ data: allProduct,success: true, message: 'Product Updated Succesfully !' })
    }else{
        res.send({ status: 400, success: false, message: 'Something Went Wrong'})
    }
}


module.exports = {
    createProduct,
    welcome,
    getAllProduct,
    deleteProductById,
    updateProductDetails,
    getProductById
}