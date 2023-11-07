const User = require('../Models/userSchema');
const generateOtp = require('./generateOtp');

const addOTPToUser = async (email,otp) => {
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        const otpCreated = new Date(Date.now());
        user.otpCreateds = otpCreated;
        const expirationTime = new Date(Date.now() + 1 * 180000);
        user.otpExpiresAt = expirationTime;
        user.OTP = otp;
        await user.save();
  
        return `OTP added to user with email: ${email}`;
      } else {
        return 'User not found';
      }
    } catch (error) {
      console.error('Error adding OTP to user:', error);
      return 'Error adding OTP to user';
    }
  };
  const verifyOTP = async (req,res) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email : req.body.email });
  
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
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return 'Error verifying OTP';
    }
  };
  module.exports = {addOTPToUser,verifyOTP}