const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookingDate: {
        type: Date,
    },
    bookingStatus: {
        type: String,
        enum: ["cancelled", "expired", "booked", "completed"],
        default : "booked"
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Booking', BookingSchema);