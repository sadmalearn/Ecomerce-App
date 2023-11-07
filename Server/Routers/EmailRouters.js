const express = require('express')
const router = express.Router();
const {sendEmail} = require('../Controller/emailSend')


router.post('/sendEmail', sendEmail)
// router.get('/getAllUsers', getAllUsers)
// router.post('/login', login)

module.exports = router