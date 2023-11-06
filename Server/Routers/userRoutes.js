const express = require('express')
const router = express.Router();
const {registerUser,getAllUsers} = require('../Controller/userController')


router.post('/registerUser', registerUser)
router.get('/getAllUsers', getAllUsers)

module.exports = router