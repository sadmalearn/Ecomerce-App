const express = require('express')
const router = express.Router();
const {sendOTP, verifyOTP,forgotPassword} = require('../Controller/MailSend/OTPSend');
// const { verifyOTP } = require('../Controller/MailSend/OTPSend');

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
router.post('/forgotPassword',forgotPassword)

module.exports = router