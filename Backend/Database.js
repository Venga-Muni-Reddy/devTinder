const mongoose = require("mongoose");

const dotenv=require('dotenv');
dotenv.config();
const connectDB = async () => {
    try {
        //mongodb://localhost:27017/
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// }
