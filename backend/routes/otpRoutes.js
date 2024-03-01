const express = require("express")
const {sendOTP} = require("../controller/otpController")
const otpRouter = express.Router();

otpRouter.post('/send-otp', sendOTP);

module.exports = otpRouter;