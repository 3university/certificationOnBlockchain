// controllers/otpController.js
const otpGenerator = require('otp-generator');
const userModel = require("../model/userModel");
const OTP = require('../model/otpModel');

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user is already present
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

module.exports = {sendOTP}