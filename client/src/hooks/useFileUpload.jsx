import { useState, useCallback } from 'react';
import { uploadFile } from '../services/api.jsx';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState('');

  const uploadFileHandler = useCallback(async (file) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setResult('');

    const data = new FormData();
    data.append("name", file.name);
    data.append("file", file);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => prev < 90 ? prev + 10 : prev);
      }, 200);

      const response = await uploadFile(data);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (response.error) {
        console.error("Upload failed:", response.error);
        setResult(`Error: ${response.error}`);
      } else {
        setResult(response.path);
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setResult(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  }, []);

  const resetUpload = useCallback(() => {
    setIsUploading(false);
    setUploadProgress(0);
    setResult('');
  }, []);

  return {
    isUploading,
    uploadProgress,
    result,
    uploadFileHandler,
    resetUpload
  };
};

export default useFileUpload;
