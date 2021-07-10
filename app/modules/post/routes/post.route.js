const express = require('express');
const router = express.Router();

const multer = require('multer');

var maxSize = 2 * 1024 * 1024 * 1024;
// SET STORAGE
var storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + new Date().getTime() + '-' + file.originalname);
    },
    onFileUploadStart: function (file, req, res) {
        if (req.files.file.length > maxSize) {
            return false;
        }
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            return true;
        }
    }
});

function fileFilter(req, file, cb) {
    var type = file.mimetype;
    var typeArray = type.split("/");
    if (typeArray[0] == "image") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({ storage: storage, limits: { fileSize: maxSize }, fileFilter: fileFilter });



const { addPost, allPosts  } = require('../controllers/post.controller');
const { protect } = require('../../../middleware/auth');

router.post('/add',protect,  addPost);
router.get('/all', allPosts);


module.exports = router;