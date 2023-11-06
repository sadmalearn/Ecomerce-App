const userCollection = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const getAllUsers = async(req, res) =>{
    const AllUserDetails = await userCollection.find().sort({ role: 1 });
    if(AllUserDetails){
        res.send({
            data : AllUserDetails,
            message: 'User fetched Sucessfully',
            success: true,
        })
    }else{
        res.send({message : 'Somthing Wend Wrong'})
    }
    
}

const registerUser = async (req, res) => {
    console.log('>>>>>>>>>>>', req.body)
    const isUserRegistered = await userCollection.findOne({ email: req.body.email });

    console.log('Is User Registered:', isUserRegistered);
    if (isUserRegistered != null) {
        return res.status(409).send({ message: 'user has already been regestered with this mail', success: false })
    }
    async function getHashedPass(password) {
        return await bcrypt.hash(password, 10);
    }
    const payload = { ...req.body };
    payload.password = await getHashedPass(req.body.password);

    const newUser = new userCollection(payload);

    try {
        await newUser.save();
        res.send({
            message: 'user Registered Sucessfully',
            success: true,
        })
    }
    catch (error) {
        res.send({ message: error.message })
    }
}
const login = async (req, res) => {
    const isUserRegistered = await userCollection.findOne({ userName: req.body.userName })
    const user = await userCollection.findOne({ userName: req.body.userName });

    // if user registered or not
    if (isUserRegistered != null) {

        const matchPassword = await bcrypt.compare(req.body.password, user.password);

        if (matchPassword == true) {
            res.send({ status: 200, success: true, message: 'Logged In Sucessfully' });
        }
        else {
            res.send({ status: 500, success: false, message: "Invalid Username or password" })
        }
    }
    else {
        res.send({ success: false, message: "User Not Found" });
    }
}

module.exports = {
    registerUser,
    login,
    getAllUsers
}