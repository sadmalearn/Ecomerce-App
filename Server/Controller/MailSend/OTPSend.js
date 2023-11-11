const otpCollection = require('./OTPSend');
const generateOtp = require('../../Util/generateOtp')
const sendEmail = require('../../Util/sendEmail')
const hashData = require('../../Util/hashData');
const otpSchema = require('../../Models/otpSchema');
const { addOTPToUser } = require('../../Util/addOtpToUserSchema');
const userSchema = require('../../Models/userSchema');
const bcrypt = require('bcrypt')
const sendOTP = async (req, res) => {
  const user = await userSchema.findOne({ userName: req.body.userName });
  const email = user.email;
  const subject = "This Mail is Regarding to change the password";
  // const message = req.body.message;
  try {
    if (!(email)) {
      console.log("something went wrong", subject)
    } else {
      // remove old OTP
      await otpSchema.deleteOne({ email : user.email })
      const generatedOtp = await generateOtp()
      // send mail
     
      // Calculate the remaining minutes and seconds
      const mailOptions = {
        from: 'sadmalearn2310@hotmail.com',
        to: email,
        subject,
        html: `<p>Hello Raphik Sayyed</p><p>You recently requested to verify your account on Ecommerce Service. To complete this process, please enter the following One-Time Password (OTP) on our website within the next 3 minutes:</p>
                <p style="color:green;font-size:22px;letter-spacing:2px;"><b>OTP : ${generatedOtp}</b></p>
                <p>Please do not share this OTP with anyone. It is valid for a single use only and will expire in 3 Minutes. If you did not request this verification, please disregard this email.</p>`
      }
      await sendEmail(mailOptions)
      // const hashedOTP = await hashData(generatedOtp);
      // const newOTP = await new otpSchema({
      //     email,
      //     otp : generatedOtp,
      //     createdAt : Date.now(),
      //     expiresAt : Date.now() + 180000 * +duration 
      // })
      const addotp = await addOTPToUser(email, generatedOtp)
      res.send({ message: 'done', data: addotp })
      // const createdOTPRecord = await newOTP.save();
      // return createdOTPRecord
    }
  }
  catch (error) {
    console.log('>>>>>>>>>>>error :-', error)
  }
}
const verifyOTP = async (req, res) => {
  try {
    // Find the user by email
    const user = await userSchema.findOne({ userName: req.body.userName });
    if (user) {
      if (user.OTP === req.body.otp) {
        // Check if the OTP has expired
        if (user.otpExpiresAt > new Date()) {
          res.send({status : 202,success : true, message: 'OTP is valid;' })
        } else {
          res.send({status : 400,success : false, message: 'OTP has expired;' })
        }
      } else {
        res.send({status : 400 ,success : false,  message: 'OTP invalid;' })
      }
    } else {
      res.send({ status : 404, message: 'User Not Found' })
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return 'Error verifying OTP';
  }
};
const forgotPassword = async (req, res) => {
  try {
    // Find the user by userName
    const user = await userSchema.findOne({ userName: req.body.userName });
    if (user) {
      // Assuming you want to update the user's password in the database
      async function getHashedPass(password) {
        return await bcrypt.hash(password, 10);
      }
      user.password = await getHashedPass(req.body.password);
      // Save the updated user with the new password
      await user.save();
      res.send({ message: 'Password Changed Successfully'});
    } else {
      res.send({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).send({ message: 'Error changing password' });
  }
};

module.exports = { sendOTP, verifyOTP, forgotPassword }