const { msg } = require('../../../../config/message');
const asyncHandler = require('../../../middleware/async');
const ErrorResponse = require('../../../helper/errorResponse');
const Booking = require('../models/booking.model');
const User = require('../../user/models/user.model');

// @desc    Add Post
// @route   POST/api/v1/post/add
// access   Public
exports.eventBooking = asyncHandler(async (req, res, next) => {
    req.body.userId = req.user._id;
    req.body.bookingDate = new Date(Date.now())
    const booking = await Booking.create(req.body);

    res.status(200).json({
        success: true,
        data: booking,
    });
});

// @desc    Add Post
// @route   POST/api/v1/post/add
// access   Public
exports.updateEventBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findByIdAndUpdate(req.body.bookingId,req.body,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        success: true,
        data: booking,
    });
});

// @desc    Add Post
// @route   POST/api/v1/post/add
// access   Public
exports.getUserBookings = asyncHandler(async (req, res, next) => {
    const booking = await Booking.find({userId : req.user._id}).populate('userId','name email');

    res.status(200).json({
        success: true,
        data: booking,
    });
});