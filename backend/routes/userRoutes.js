const express = require("express")
const { registerUser, loginUser, verifyToken, getUser, refreshToken, logout} = require("../controller/userController")
const { sendOTP } = require("../controller/otpController")
const router = express.Router()

// router.post('/register', registerUser, sendOTP)

router.post('/login', loginUser)

router.get('/user', verifyToken, getUser)

router.get('/refresh', refreshToken,verifyToken,getUser)

router.post('/logout',verifyToken,logout)


module.exports = router