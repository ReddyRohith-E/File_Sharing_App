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