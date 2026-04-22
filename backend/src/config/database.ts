import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';

// Force Node.js to use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGODB_URL;

    if (!mongoURL) {
      throw new Error('MONGODB_URL is not defined in .env file!');
    }

    // Connection options
    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoURL, options);
    console.log('✅ Connected to MongoDB Atlas');

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;