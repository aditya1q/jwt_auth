import mongoose from 'mongoose';

export const ConnetDB = async (mongoUrl) => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}