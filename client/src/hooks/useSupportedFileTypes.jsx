import { useState, useEffect } from 'react';
import { getSupportedFileTypes } from '../services/api.jsx';

const useSupportedFileTypes = () => {
  const [supportedTypes, setSupportedTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSupportedTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getSupportedFileTypes();
      setSupportedTypes(result.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch supported file types:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportedTypes();
  }, []);

  // Get accept attribute for file input
  const getAcceptAttribute = () => {
    if (!supportedTypes) {
      // Default fallback
      return '.jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,image/jpeg,image/png,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    return supportedTypes.acceptAttribute || supportedTypes.allowedTypes?.join(',') || '';
  };

  // Get maximum file size
  const getMaxFileSize = () => {
    if (!supportedTypes) return 524288000; // 500MB default
    return supportedTypes.maxFileSize || 524288000;
  };

  // Get maximum file size in MB
  const getMaxFileSizeMB = () => {
    return Math.round(getMaxFileSize() / (1024 * 1024));
  };

  // Check if a file type is supported
  const isFileTypeSupported = (fileType) => {
    if (!supportedTypes) return false;
    return supportedTypes.allowedTypes?.includes(fileType) || false;
  };

  return {
    supportedTypes,
    loading,
    error,
    getAcceptAttribute,
    getMaxFileSize,
    getMaxFileSizeMB,
    isFileTypeSupported,
    refetch: fetchSupportedTypes
  };
};

export default useSupportedFileTypes;
