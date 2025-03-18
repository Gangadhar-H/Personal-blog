import mongoose, { Mongoose } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
}

export default connectDB;
