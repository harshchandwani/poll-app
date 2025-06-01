// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from 'redis';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS to allow cross-origin requests (useful for frontend-backend communication)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit if DB connection fails
    });
// ----------------------
// Redis Client Setup
// ----------------------
const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 6379,
    }
});

redisClient.connect()
    .then(() => console.log('✅ Redis connected'))
    .catch(err => console.error('❌ Redis connection error:', err));


// ----------------------
// Test Route
// ----------------------
app.get('/', (_req, res) => {
    res.send('📡 Backend is running');
});


// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});

// Export app and redisClient for use in other files (like routes, middleware, etc.)
export { app, redisClient };