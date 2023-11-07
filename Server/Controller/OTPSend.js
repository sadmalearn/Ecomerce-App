const otpCollection = require('../Controller/OTPSend');
const generateOtp = require('../Util/generateOtp')
const sendEmail = require('../Util/sendEmail')
const hashData = require('../Util/hashData');
const otpSchema = require('../Models/otpSchema');
const {addOTPToUser} = require('../Util/addOtpToUserSchema');
const userSchema = require('../Models/userSchema');
const sendOTP = async (req, res) =>{
    console.log("req hittt",req);
    const email = req.body.email;
    const subject = "This Mail is Regarding to change the password";
    const message = req.body.message;
    const duration = req.body.duration;
    try {
        // const {email, subject, message, duration} = req.body; 
        if (!(email && subject && message)) {
            console.log("something went wrong",subject)
        } else {

            // remove old OTP
            await otpSchema.deleteOne({email})

            const generatedOtp = await generateOtp()
            console.log(generatedOtp);
            // send mail

            const mailOptions = {
                from : 'sadmalearn2310@hotmail.com',
                to : email,
                subject,
                html : `<p>Hello Raphik Sayyed</p><p>You recently requested to verify your account on Ecommerce Service. To complete this process, please enter the following One-Time Password (OTP) on our website within the next 3 minutes:</p>
                <p style="color:green;font-size:22px;letter-spacing:2px;"><b>OTP : ${generatedOtp}</b></p>
                    <p>Please do not share this OTP with anyone. It is valid for a single use only and will expire in ${duration} minutes. If you did not request this verification, please disregard this email.</p>`
                // html : `<p>${message}</p><p style="color:green;font-size:22px;letter-spacing:2px;"><b>${generatedOtp}</b></p><p>This OTP Expires in ${duration}</p>`
            }
            console.log(mailOptions);
            await sendEmail(mailOptions)
            // save OTP
            const hashedOTP = await hashData(generatedOtp);

            const newOTP = await new otpSchema({
                email,
                otp : generatedOtp,
                createdAt : Date.now(),
                expiresAt : Date.now() + 180000 * +duration 
            })
            const addotp = await addOTPToUser(email,generatedOtp)
            res.send({message : 'done', data: addotp})
            const createdOTPRecord = await newOTP.save();
            return createdOTPRecord
            // res.send({message : 'otpsend', data : createdOTPRecord}) 
        }
    }
    catch (error){
        console.log('>>>>>>>>>>>error :-', error)
    }
}
const verifyOTP = async (req,res) => {
    try {
      // Find the user by email
      const user = await userSchema.findOne({ email : req.body.email });
    if(user){
        
      if (user && user.OTP === req.body.otp) {
        // Check if the OTP has expired
        if (user.otpExpiresAt > new Date()) {
          res.send({message : 'OTP is valid;'}) 
        } else {
          res.send({message : 'OTP has expired;'}) 
        //   return 'OTP has expired';
        }
      } else {
        return 'Invalid OTP';
      } 
    }else{
        res.send({message : 'User Not Found'}) 
    }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return 'Error verifying OTP';
    }
  };
module.exports = {sendOTP,verifyOTP}