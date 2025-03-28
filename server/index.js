import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBConnection from './database/db.js';


const app = express();
const PORT = 8000;

// Middleware

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Database Connection
DBConnection();

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
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
