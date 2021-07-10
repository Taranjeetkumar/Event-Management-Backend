const express = require('express');
const router = express.Router();

const { eventBooking,updateEventBooking,getUserBookings }= require('../controllers/booking.controller');
const { protect } = require('../../../middleware/auth');

router.post('/add',protect,  eventBooking);
router.put('/update',protect,  updateEventBooking);
router.get('/bookings',protect, getUserBookings);



module.exports = router;