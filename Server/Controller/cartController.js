const cartCollection = require('../Models/addToCartSchema')
const productSchema = require('../Models/ProductSchema')

const getAllCartDetails = async(req,res)=>{
    const allCartDetails = await cartCollection.find().sort({ productCode: 1 });
    if(allCartDetails){
        res.send({
            data : allCartDetails,
            message: 'User fetched Sucessfully',
            success: true,
        })
    }else{
        res.send({message : 'Somthing Wend Wrong'})
    }
}

const getAllCartValuebyUserName = async (req, res) =>{
    const { userName } = req.params;
    const cartValue = await cartCollection.findOne({ userName: userName });
    if(cartValue){
        res.send({ data:cartValue, success: true, message: 'cart Details!' })
    }else{
        res.send({ status: 400, success: false, message: 'Something Went Wrong' })
    }
}

const deleteCartValueById = async (req, res) =>{
    const { id } = req.params;
    const deleteProduct = await cartCollection.deleteOne({ _id: id });   
    if(deleteProduct){
        const allProduct = await cartCollection.find().sort({productCode : 1})
        res.send({ data:allProduct,success: true, message: 'Product Deleted Succefully !' })
    }else{
        res.send({ status: 400, success: false, message: 'Something Went Wrong' })
    }
}
const addCartValueInCart = async (req, res) => {
    const payload = { ...req.body };
    const { productCode, userName, sizes, color, quantity } = payload;
    try {
        const productDetails = await productSchema.findOne({ productCode, sizes, color });
        console.log(productDetails);
        if (!productDetails) {
            return res.status(404).send({ message: 'Product not available in the specified size and color', success: false });
        }
        payload.totalPrice = productDetails.price * quantity;
        const cartAvailable = await cartCollection.find({ productCode, userName, sizes, color });
        if (cartAvailable.length > 0) {
            const updatedCart = await cartCollection.findOneAndUpdate(
                { productCode, userName, sizes, color },
                {
                    $set: {
                        quantity: Number(cartAvailable[0].quantity) + Number(quantity),
                        totalPrice: Number(cartAvailable[0].totalPrice) + Number(payload.totalPrice)
                    }
                },
                { new: true }
            );
            return res.status(200).send({ message: 'Cart Updated Successfully', updatedCart, success: true });
        } else {
            const cartDetails = new cartCollection(payload);
            await cartDetails.save();
            return res.status(200).send({ message: 'Cart Added Successfully', success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error', success: false });
    }
};


module.exports = {getAllCartValuebyUserName,addCartValueInCart,getAllCartDetails}