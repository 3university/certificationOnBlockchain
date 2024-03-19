// controllers/otpController.js
const otpGenerator = require('otp-generator');
const userModel = require("../model/userModel");
const OTP = require('../model/otpModel');

const sendOTP = async (req, res, next) => {
  console.log("this is after register next")
  try {
    const { email } = req.body;

    // // Check if user is already present
    // const checkUserPresent = await userModel.findOne({ email });
    // // If user found with provided email
    // if (checkUserPresent) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'User is already registered',
    //   });
    // }


    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error.message, "error message now");
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verifyOtp = async (req,res,next) =>{

  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

     // Find the most recent OTP for the email
     const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
     if (response.length === 0 || otp !== response[0].otp) {
       return res.status(400).json({
         success: false,
         message: 'The OTP is not valid',
       });
     }
     
    // Check if the OTP is expired or not
    const currentTime = new Date();
    const otpExpiration = new Date(otpRecord.createdAt);
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 5); 
    if (currentTime > otpExpiration) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired',
      });
    }


    // Delete the OTP record from the database
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.log(error.message, "error message now");
    return res.status(500).json({ success: false, error: error.message });
  }

  next()
}

module.exports = {sendOTP, verifyOtp}