const { msg } = require("../../../../config/message");
const asyncHandler = require("../../../middleware/async");
const ErrorResponse = require("../../../helper/errorResponse");
const Post = require("../models/post.model");
const User = require("../../user/models/user.model");
const Booking = require("../../booking/models/booking.model");

// @desc    Add Post
// @route   POST/api/v1/post/add
// access   Public
exports.getCreatedEvent = asyncHandler(async (req, res, next) => {
    let post1 = await Post.findOne({ _id: req.query.eventId, organizerId: req.user._id });
    if (!post1) {
        return next(new ErrorResponse("You are not authorized to access this route", 409));
    }

    res.status(200).json({
        success: true,
        data: post1,
    });
});

// @desc    Add Post
// @route   POST/api/v1/post/add
// access   Public
exports.addEvent = asyncHandler(async (req, res, next) => {
    console.log("vdvchjs : ",req.body);
    let findLastPost = await Post.findOne({}).select("eventId").sort({ createdAt: -1 });
    let eventImages = req.files;

    console.log("images : : ", eventImages)
    let images = [];
    if (eventImages) {
        if (eventImages.length != 0) {
            for (let i = 0; i < eventImages.length; i++) {
                images.push(eventImages[i].key);
            }
        }
    }
    if (images.length > 0) {
        req.body.eventImages = images;
    }
    let eventId;
    if (findLastPost) {
        eventId = Number(findLastPost.eventId) + 1;
    } else {
        eventId = 1001;
    }
    req.body.eventId = eventId;
    req.body.organizerId = req.user._id;

    if (req.body.eventStartDate) {
        req.body.eventStartDate = new Date(req.body.eventStartDate);
    }
    if (req.body.eventEndDate) {
        req.body.eventEndDate = new Date(req.body.eventEndDate);
    }

    const post = await Post.create(req.body);

    res.status(200).json({
        success: true,
        data: post,
    });
});

// @desc    Update Post
// @route   POST/api/v1/post/update
// access   Public
exports.updateEvent = asyncHandler(async (req, res, next) => {
    let eventImages = req.files;
    let images = [];
    if (eventImages) {
        if (eventImages.length != 0) {
            for (let i = 0; i < eventImages.length; i++) {
                images.push(eventImages[i].key);
            }
        }
    }

    if (images.length > 0) {
        req.body.eventImages = images;
    }

    let post1 = await Post.findOne({ _id: req.query.eventId, organizerId: req.user._id });

    if (!post1) {
        return next(new ErrorResponse("You are not authorized to access this route", 409));
    }

    const post = await Post.findByIdAndUpdate(req.query.eventId, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: post,
    });
});

// @desc    Get All Post
// @route   POST/api/v1/post/posts
// access   Public
exports.allEvents = asyncHandler(async (req, res, next) => {
    let page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1,
        limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    const post = await Post.find({ status: "available" })
        .populate("organizerId", "name email address")
        .skip(limit * page - limit)
        .limit(limit);
    if (post.length > 0) {
        for (let i = 0; i < post.length; i++) {
            let booking = await Booking.find({ eventId: post[i]._id }).populate(
                "userId",
                "_id name email"
            );
            let users = [];
            if (booking.length > 0) {
                for (let k = 0; k < booking.length; k++) {
                    if (booking[k].userId) {
                        if (booking[k].userId._id) {
                            users.push(booking[k].userId._id);
                        }
                    }
                }
            }
            post[i]._doc.users = users;
        }
    }

    res.status(200).json({
        success: true,
        data: post,
    });
});
