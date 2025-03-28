import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');
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
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 500 * 1024 * 1024 }, // Limit file size to 500MB
});

export default upload;