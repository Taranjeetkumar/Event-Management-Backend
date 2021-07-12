const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    eventId: {
        type: Number,
        required: [true, "This field is Required"]
    },
    organizerId: {
        type: String,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ["available", "expired"],
        default: "available"
    },
    eventPrice: {
        type: Number,
        required: true,
    },
    eventImages: [{
        type: String,
    }],
    eventName: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
    },
    eventStartDate: {
        type: Date,
        required: true
    },
    eventEndDate: {
        type: Date,
        required: true,
    },
    eventStartTime: {
        type: String,
        required: true,
    },
    eventEndTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Event', EventSchema);