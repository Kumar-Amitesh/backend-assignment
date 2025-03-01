// Purpose: Connect to MongoDB using mongoose
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    }
    catch(error){
        console.log("Error connecting to MongoDB", error);
    }
};

export default connectDB;