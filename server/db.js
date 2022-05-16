const mongoose = require("mongoose");

const uriMongoDB = `mongodb://${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`

module.exports = async () => {
    try {
        await mongoose.connect(uriMongoDB);
        console.log("DB is connected")
    } catch (error) {
        console.log(error);
    }
};
