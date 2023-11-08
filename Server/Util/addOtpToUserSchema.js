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
        return `OTP Send Succefully on : ${email}`;
      } else {
        return 'User not found';
      }
    } catch (error) {
      console.error('Error adding OTP to user:', error);
      return 'Error adding OTP to user';
    }
  };
  
  module.exports = {addOTPToUser}