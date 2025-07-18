import express from 'express';
import { uploadImage, downloadImage, getServerInfo, getFilesList, getSupportedFileTypes } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
router.get('/server-info', getServerInfo);
router.get('/files', getFilesList);
router.get('/supported-files', getSupportedFileTypes);

export default router;