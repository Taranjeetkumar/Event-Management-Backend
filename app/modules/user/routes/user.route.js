const express = require('express');
const router = express.Router();

const { test, postregister, login, getMe } = require('../controllers/user.controller');
const { protect } = require('../../../middleware/auth');

router.get('/', protect, test);
router.post('/register', postregister);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;