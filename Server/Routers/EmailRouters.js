const express = require('express')
const router = express.Router();
const {sendOTP} = require('../Controller/OTPSend');
const { verifyOTP } = require('../Controller/OTPSend');

// router.post('/', async(req,res)=>{
//     try {
//         const {email, subject, message, duration} = req.body;
//         const createdOTP = await sendOTP({ email,subject, message, duration })
//         res.status(200).json(createdOTP)
//     } catch (error) {
        
//     }
// })


router.post('/sendOTP',sendOTP)
router.post('/verifyOTP',verifyOTP)

module.exports = router