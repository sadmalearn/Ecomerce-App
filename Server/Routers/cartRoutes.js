const express = require('express')
const router = express.Router();
const {getAllCartValuebyUserName,addCartValueInCart,getAllCartDetails} = require('../Controller/cartController')


router.get('/getAllCartValuebyUserName/:userName', getAllCartValuebyUserName)
router.get('/getAllCartDetails', getAllCartDetails)
router.post('/addCartValueInCart', addCartValueInCart)


module.exports = router