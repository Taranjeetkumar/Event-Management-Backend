const { msg } = require('../../../../config/message');
const asyncHandler = require('../../../middleware/async');
const ErrorResponse = require('../../../helper/errorResponse');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const fs = require("fs");
const { sendVerificationOtpOnPhone, verifyOtpOnPhone, sendOtpOnMail, verifyOtpOnMail } = require("../../../helper/twilio");
const validator = require("email-validator");

generateRandomCode = () => Math.floor(100000 + Math.random() * 900000);

module.exports.test = function (req, res) {
    res.status(200).json({
        success: true,
        data: "Welcome to Assignment"
    })
}

// @desc    Register User
// @route   POST/api/v1/user/register
// access    Public
exports.postregister = asyncHandler(async (req, res, next) => {
    let { name, email, password, latitude, longitude } = req.body;

    if (!/^[A-Za-z]+/.test(name)) throw { type: "name", error: "invalid name" };
    if (!password) throw { type: "password", error: "password cannot be empty" };

    const salt = await bcrypt.genSalt(10);
    let pass = password.toString();
    const hashedPassord = await bcrypt.hash(pass, salt);

    if (!email) {
        return next(new ErrorResponse(msg.emailOrPhoneRequired, 409));
    }

    let userExist = await User.findOne({ email: email });

    if (userExist) {
        return next(new ErrorResponse(msg.duplicatePhoneOrEmail, 409));
    }
    let response = await User.create({
        name: name,
        email: email,
        password: hashedPassord,
        latitude: latitude,
        longitude: longitude,
    });

    const token = response.getSignedJwtToken();//create token
    response = JSON.stringify(response);
    response = JSON.parse(response);

    delete response['password'];

    await sendOtpOnMail(response.email);
    res.status(200).json({
        success: true,
        data: response,
        token
    });
});

// @desc    Verify Otp
// @route   POST/api/v1/user/verifyotp
// access    Public
exports.verifyOtp = asyncHandler(async (req, res, next) => {
    let { email, otp } = req.body;
    let status = false;
    if (!email) {
        return next(new ErrorResponse(msg.notValid, 409));
    }
    let email1 = validator.validate(email);
    let ack;
    if (email1 == true) {

        ack = await verifyOtpOnMail(otp, email);
        if (ack.status == "approved") {
            status = true;
        }
    }

    if (status == true) {
        res.status(200).json({
            success: true,
            data: `otp verified`,
        });
    } else {
        return next(new ErrorResponse(msg.notVerified, 409));
    }
});

// @desc    Login User
// @route   POST/api/v1/user/login
//access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    let pass = password;
    if (!email || !password) {
        //validate phone and password
        return next(new ErrorResponse(msg.noPhoneOrPassword, 400));
    }
    let user = await User.findOne({ email: email }).select("+password"); //check for user
    if (!user) {
        return next(new ErrorResponse(msg.unauthorizedLogin, 401));
    }
    const isMatch = await user.matchPassword(pass); //model method to match the hashed password with the password user has provided
    if (!isMatch) {
        return next(new ErrorResponse(msg.unauthorizedLogin, 401));
    }

    const token = user.getSignedJwtToken();
    console.log(user)
    user = JSON.stringify(user);
    user = JSON.parse(user);

    delete user["password"];

    res.status(200).json({
        success: true,
        data: user,
        token,
    });
});

// @desc    Get current logged in user
// @route   GET/api/v1/user/me
//access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user._id);

    user = JSON.stringify(user);
    user = JSON.parse(user);

    delete user["password"];


    res.status(200).json({
        success: true,
        data: user
    });
});

