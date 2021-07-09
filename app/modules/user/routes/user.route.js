const express = require('express');
const router = express.Router();

const { test, postregister, login,verifyOtp, getMe } = require('../controllers/user.controller');
const { protect } = require('../../../middleware/auth');

router.get('/', protect, test);
router.post('/register', postregister);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post("/verifyotp", verifyOtp);



module.exports = router;