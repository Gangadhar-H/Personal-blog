import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
}

export default connectDB;
