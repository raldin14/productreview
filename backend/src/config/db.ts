import mongoose from "mongoose";

const connectDB =async () => {
    const env = process.env.NODE_ENV || 'development';

    const mongoURI = env === 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_DEV;
    try {
        const conn = await mongoose.connect(mongoURI as string);
        console.log(`MongoDB Connected: ${conn.connection.host} : ${env}`);
    } catch (error) {
        console.error("MongoDB connection feiled: ", error);
        process.exit(1);
    }
}

export default connectDB;