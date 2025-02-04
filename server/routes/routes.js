import express from 'express';
import { uplooadImage,downloadImage} from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const router=express.Router();


router.post('/upload',upload.single('file'),uplooadImage);
router.get('/file/:fileId',downloadImage);

export default router;