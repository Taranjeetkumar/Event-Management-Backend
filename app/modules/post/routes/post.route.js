const express = require('express');
const router = express.Router();

const { addEvent, allEvents, updateEvent } = require('../controllers/post.controller');
const { protect } = require('../../../middleware/auth');
const { upload1 } = require('../../../helper/multer-s3')

router.post('/add', upload1('eventImages').array('eventImages'), protect, addEvent);
router.put('/update', upload1('eventImages').array('eventImages'), protect, updateEvent);
router.get('/all', allEvents);


module.exports = router;