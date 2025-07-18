import FileModel from '../models/file.js';

export const uploadImage = async (request, response) => {
   const fileObj = {
    path: request.file.path,
    name: request.file.originalname
   }

    try {
       const file = await FileModel.create(fileObj);
       
       // Dynamically generate the download URL based on the request
       const protocol = request.protocol;
       const host = request.get('host');
       const downloadUrl = `${protocol}://${host}/file/${file._id}`;
       
       response.status(200).json({ path: downloadUrl });
    }
    catch(error) {
        console.error(error.message);
        response.status(500).json({error: error.message});
    }
};
export const downloadImage = async (request,response) => {
    try{
        const file = await FileModel.findById(request.params.fileId)

        file.downloadContent++;
        
        await file.save();
        response.download(file.path,file.name);
    }
    catch(error){
        console.error(error.message);
        return response.status(500).json({error: error.message});
    }
};

export const getServerInfo = async (request, response) => {
    try {
        const protocol = request.protocol;
        const host = request.get('host');
        const serverUrl = `${protocol}://${host}`;
        
        response.status(200).json({
            status: 'online',
            serverUrl: serverUrl,
            timestamp: new Date().toISOString(),
            message: 'File sharing server is running'
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};

export const getFilesList = async (request, response) => {
    try {
        const files = await FileModel.find({}).select('name uploadDate downloadContent').sort({ uploadDate: -1 }).limit(10);
        const protocol = request.protocol;
        const host = request.get('host');
        
        const filesList = files.map(file => ({
            id: file._id,
            name: file.name,
            uploadDate: file.uploadDate,
            downloadCount: file.downloadContent,
            downloadUrl: `${protocol}://${host}/file/${file._id}`
        }));
        
        response.status(200).json({
            files: filesList,
            count: filesList.length
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};

export const getSupportedFileTypes = async (request, response) => {
    try {
        const allowedTypes = process.env.ALLOWED_FILE_TYPES 
            ? process.env.ALLOWED_FILE_TYPES.split(',')
            : ['image/jpeg', 'image/png', 'application/pdf'];

        const maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 500 * 1024 * 1024; // Default to 500MB

        // Create file extension mapping for better frontend handling
        const fileExtensions = {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/zip': ['.zip'] // ✅ Added support for ZIP files
        };

        const acceptAttribute = allowedTypes
            .flatMap(type => fileExtensions[type] || [])
            .concat(allowedTypes)
            .join(',');

        response.status(200).json({
            allowedTypes: allowedTypes,
            maxFileSize: maxFileSize,
            maxFileSizeMB: Math.round(maxFileSize / (1024 * 1024)),
            acceptAttribute: acceptAttribute,
            fileExtensions: fileExtensions,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};