const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
var fs = require("fs");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log(`MONGO DB CONNECTED :${conn.connection.host}`);
    let connection = mongoose.connection;

    connection.once('open', () => {
        // Init stream
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('newBucket');
    });



    //     let bucket;
    //     let b = await mongoose.connection.on("connected", () => {
    //         let db = mongoose.connections[0].db;
    //         bucket = new mongoose.mongo.GridFSBucket(db, {
    //             bucketName: "newBucket"
    //         });
    //         console.log(bucket);
    //     });
    // 
    //     console.log("Bucket : : : ", b);
}

module.exports = connectDB;