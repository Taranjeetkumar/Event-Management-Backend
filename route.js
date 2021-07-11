const user_route = require('./app/modules/user/routes/user.route');
const post_route = require('./app/modules/post/routes/post.route');
const booking_route = require('./app/modules/booking/routes/booking.route');
const payment_route = require('./app/modules/payment/routes/payment.route');


module.exports = [
    {
        path: '/api/v1/user',
        handler: user_route
    },
    {
        path: '/api/v1/payment',
        handler: payment_route
    },
    {
        path: '/api/v1/post',
        handler: post_route
    },
    {
        path: '/api/v1/booking',
        handler: booking_route
    },
]