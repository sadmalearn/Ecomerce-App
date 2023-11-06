const express = require('express')
const router = express.Router();
const {registerUser,getAllUsers,login} = require('../Controller/userController')


router.post('/registerUser', registerUser)
router.get('/getAllUsers', getAllUsers)
router.post('/login', login)

module.exports = router