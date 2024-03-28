import mongoose from "mongoose";

export const connectMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB database");
    } catch (error) {
        console.log("Can't connect to database",error);
    }
}