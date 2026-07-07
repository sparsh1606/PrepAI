import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");

    }catch(err){
        console.log(`Error in connecting to database: ${err.message}`)
    }
}

export default connectDB;