import multer from 'multer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir)) {
    try {
        fs.mkdirSync(uploadDir); // Create the uploads directory if it doesn't exist
    } catch (error) {
        console.error('Error creating uploads directory:', error.message);
        process.exit(1); // Exit the process if the directory cannot be created
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = process.env.ALLOWED_FILE_TYPES 
        ? process.env.ALLOWED_FILE_TYPES.split(',')
        : ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Only ${allowedTypes.join(', ')} files are allowed.`));
    }
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: { 
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 500 * 1024 * 1024 // Default to 500MB
    },
});

export default upload;