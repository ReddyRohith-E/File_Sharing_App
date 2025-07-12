import express from 'express';
import { uploadImage, downloadImage, getServerInfo, getFilesList } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
router.get('/server-info', getServerInfo);
router.get('/files', getFilesList);

export default router;