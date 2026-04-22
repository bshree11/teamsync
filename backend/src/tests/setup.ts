/**
 * TEST SETUP
 * 
 * What: Connects to database + cleans test data
 */

import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// Fix for Jio/Reliance DNS issue
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Increase timeout for slow connections
jest.setTimeout(30000);

// Connect before all tests
beforeAll(async () => {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    throw new Error('MONGODB_URL not found');
  }
  
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUrl);
  }
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
});