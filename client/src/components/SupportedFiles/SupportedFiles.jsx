import React, { useState, useEffect } from 'react';
import { getSupportedFileTypes } from '../../services/api.jsx';
import './SupportedFiles.css';

const SupportedFiles = () => {
  const [supportedFilesData, setSupportedFilesData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Default file types mapping for display
const getFileDisplayInfo = (mimetype) => {
    const fileInfoMap = {
        'image/jpeg': { name: 'JPEG Images', extension: '.jpg, .jpeg', category: 'Images' },
        'image/png': { name: 'PNG Images', extension: '.png', category: 'Images' },
        'application/pdf': { name: 'PDF Documents', extension: '.pdf', category: 'Documents' },
        'text/plain': { name: 'Text Files', extension: '.txt', category: 'Documents' },
        'application/msword': { name: 'Word Documents', extension: '.doc', category: 'Documents' },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 
            { name: 'Word Documents (Modern)', extension: '.docx', category: 'Documents' },
        'application/zip': { name: 'ZIP Archives', extension: '.zip', category: 'Archives' }
    };

    return fileInfoMap[mimetype] || { 
        name: mimetype, 
        extension: 'Various', 
        category: 'Other' 
    };
};

  // Group files by category
  const groupFilesByCategory = (allowedTypes) => {
    const categories = {};
    
    allowedTypes.forEach(mimetype => {
      const info = getFileDisplayInfo(mimetype);
      if (!categories[info.category]) {
        categories[info.category] = [];
      }
      categories[info.category].push({
        ...info,
        mimetype
      });
    });
    
    return Object.entries(categories).map(([category, types]) => ({
      category,
      types
    }));
  };

  const fetchSupportedFiles = async () => {
    setLoading(true);
    try {
      const result = await getSupportedFileTypes();
      setSupportedFilesData(result.data);
    } catch (error) {
      console.error('Failed to fetch supported file types:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportedFiles();
  }, []);

  // Get grouped files
  const supportedFiles = supportedFilesData 
    ? groupFilesByCategory(supportedFilesData.allowedTypes)
    : [
        {
          category: 'Images',
          types: [
            { name: 'JPEG Images', extension: '.jpg, .jpeg', category: 'Images' },
            { name: 'PNG Images', extension: '.png', category: 'Images' }
          ]
        },
        {
          category: 'Documents', 
          types: [
            { name: 'PDF Documents', extension: '.pdf', category: 'Documents' },
            { name: 'Text Files', extension: '.txt', category: 'Documents' },
            { name: 'Word Documents', extension: '.doc', category: 'Documents' },
            { name: 'Word Documents (Modern)', extension: '.docx', category: 'Documents' }
          ]
        }
      ];

  const maxFileSizeMB = supportedFilesData 
    ? supportedFilesData.maxFileSizeMB || Math.round(supportedFilesData.maxFileSize / (1024 * 1024))
    : 500;

  return (
    <div className="supported-files">
      <div className="supported-files-header">
        <h3>Supported File Types</h3>
        <p>You can upload and share the following file formats:</p>
      </div>

      <div className="supported-files-scrollable">
        {loading ? (
          <div className="loading-message">
            <span className="loading-text">Loading supported file types...</span>
          </div>
        ) : supportedFiles.length > 0 ? (
          <div className="supported-files-list">
            {supportedFiles.map((category, categoryIndex) => (
              <div key={categoryIndex} className="file-category-simple">
                <h4 className="category-title-simple">{category.category}</h4>
                <ul className="file-types-list">
                  {category.types.map((file, fileIndex) => (
                    <li key={fileIndex} className="file-type-item">
                      <span className="file-name">{file.name}</span>
                      <span className="file-extension">{file.extension}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="error-message">
            <span className="error-text">Unable to load supported file types. Using default configuration.</span>
          </div>
        )}
      </div>

      <div className="supported-files-footer">
        <div className="file-size-info">
          Maximum file size: <strong>{maxFileSizeMB} MB</strong>
        </div>
        <div className="security-info">
          Files are securely stored and accessible only through your network
        </div>
      </div>
    </div>
  );
};

export default SupportedFiles;
