const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

exports.upload = (folder, req) => multer({
    storage: new GridFsStorage({
        url: process.env.MONGO_URI,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: 'newBucket'
                };
                resolve(fileInfo);
            });
        }
    })
})


