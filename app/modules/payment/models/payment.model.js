const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "paid", "cancel"],
        default: "pending"
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Payment', PaymentSchema);