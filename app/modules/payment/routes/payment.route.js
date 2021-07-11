const express = require('express');
const router = express.Router();

const { payment, }= require('../controllers/payment.controller');
const { protect } = require('../../../middleware/auth');

router.post('/generateId',protect,  payment);


module.exports = router;