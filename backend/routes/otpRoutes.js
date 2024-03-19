const express = require("express")
const {sendOTP, verifyOtp} = require("../controller/otpController");
// const { registerUser } = require("../controller/userController");
const otpRouter = express.Router();

// otpRouter.post('/send-otp', sendOTP);

otpRouter.post('/verify-otp', verifyOtp)

module.exports = otpRouter;