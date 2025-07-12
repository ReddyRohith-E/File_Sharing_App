import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DBConnection = async () => {
    try {
        // Get credentials from environment variables
        const username = process.env.MONGODB_USERNAME;
        const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
        const cluster = process.env.MONGODB_CLUSTER;
        const databaseName = process.env.MONGODB_DATABASE_NAME;

        // Validate required environment variables
        if (!username || !password || !cluster) {
            throw new Error('Missing required MongoDB environment variables. Please check your .env file.');
        }

        // Construct MongoDB URL
        const MONGODB_URL = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${databaseName}`;
        
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URL);
        console.log('Database connected successfully');
        console.log(`Connected to database: ${databaseName}`);
    } 
    catch(error){
        console.error('Error while connecting with the database:', error.message);
        process.exit(1); // Exit the application if database connection fails
    }
}
export default DBConnection;