const { msg } = require('../../../../config/message');
const asyncHandler = require('../../../middleware/async');
const ErrorResponse = require('../../../helper/errorResponse');
const Post = require('../models/post.model');
const User = require('../../user/models/user.model');

// @desc    Add Post
// @route   POST/api/v1/post/add
// access   Public
exports.addEvent = asyncHandler(async (req, res, next) => {
    let findLastPost = await Post.findOne({}).select('eventId').sort({ createdAt: -1 });
    let eventId;
    if (findLastPost) {
        eventId = Number(findLastPost.eventId) + 1;
    }
    else {
        eventId = 1001
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

    const post = await Post.findByIdAndUpdate(req.query.eventId, req.body, {
        new: true,
        runValidators: true,
    })

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

        
    const post = await Post.find({}).populate("organizerId", "name email address").skip(limit * page - limit)
        .limit(limit);


    res.status(200).json({
        success: true,
        data: post,
    });
});

