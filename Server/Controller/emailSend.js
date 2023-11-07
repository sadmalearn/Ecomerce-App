const nodemailer = require('nodemailer');
const userCollection = require('../Models/userSchema')

const sendEmail = async (req, res) => {
    const {email} = req.body
    if(email){
        res.send({message : 'email found'})
    } else{
        res.send({message : 'email is required'})
    }
};

const sendVerificationOTPEmail = async(req, res) =>{
    const {email} = req.body
    try{
        const existingUser = await userCollection.findOne({email})
        if (existingUser) {
            res.send({message : 'email found'})
            const otpDetails = {
                email,
                subject : "Email Verification",
                message : "Verify your email with the code below.",
                duration : 1,
            }
        } else {
            res.send({message : 'email is required'})
        }
    } catch (error){
        console.log(error);
    }
}

module.exports = ({sendEmail})

