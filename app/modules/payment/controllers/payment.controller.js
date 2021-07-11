const { msg } = require('../../../../config/message');
const asyncHandler = require('../../../middleware/async');
const ErrorResponse = require('../../../helper/errorResponse');
const Payment = require('../models/payment.model');
const User = require('../../user/models/user.model');
const Booking = require('../../booking/models/booking.model');
const Razorpay = require("razorpay");

let instance = new Razorpay({
    key_id: 'rzp_test_d3fIdfEXIFhpGY', // your `KEY_ID`
    key_secret: 'gd2JEZV6IywEDS4acns57Vpv' // your `KEY_SECRET`
})


exports.createPayment = asyncHandler(async (req, res, next) => {
    req.body.userId = req.user._id;
    let payment = await Payment.create(req.body);
    res.status(200).json({
        success: true,
        data: payment,
    });
});

// @desc    Add Payment
// @route   POST/api/v1/payment/add
// access   Public
exports.payment = asyncHandler(async (req, res, next) => {
    let booking = await Booking.findById(req.body.bookingId).populate('eventId', 'eventPrice');

    let params = {
        amount: (Number(booking.eventId.eventPrice) * 100),
        currency: 'INR',
        receipt: 'Taran',
        payment_capture: '0'
    }

    await instance.orders.create(params).then((data) => {
        res.status(200).json({
            success: true,
            data: data,
        });
    }).catch((error) => {
        res.status(401).json({
            success: false,
            data: error,
        });
    })
});

