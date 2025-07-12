import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all network interfaces

// Middleware

app.use(cors({
    origin: '*', // Allow all origins for network access
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); // Enable CORS for network access
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Database Connection
DBConnection();

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));
app.use('/files', express.static('uploads')); // Alternative endpoint for file access

// Routes
app.use('/', router);

// Default Route
app.get('/', (req, res) => {
    res.send('Server is running successfully');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`Access from network: http://<YOUR_IP_ADDRESS>:${PORT}`);
    console.log('To find your IP address, run: ipconfig (Windows) or ifconfig (Mac/Linux)');
});
