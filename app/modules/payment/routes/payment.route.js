const express = require('express');
const router = express.Router();

const { payment,createPayment }= require('../controllers/payment.controller');
const { protect } = require('../../../middleware/auth');

router.post('/generateId',protect,  payment);
router.post('/create',protect,createPayment);

module.exports = router;