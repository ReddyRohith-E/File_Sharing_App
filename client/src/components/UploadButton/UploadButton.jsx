import React from 'react';
import './UploadButton.css';

const UploadButton = ({ 
  onUploadClick, 
  isUploading, 
  serverStatus, 
  uploadProgress 
}) => {
  const isDisabled = isUploading || serverStatus.status === 'error';
  
return (
    <button 
        onClick={onUploadClick}
        disabled={isDisabled}
        className={`upload-button ${isUploading ? 'uploading' : ''} ${isDisabled ? 'disabled' : ''}`}
        aria-label={isUploading ? `Uploading file, ${uploadProgress}% complete` : 'Upload file'}
    >
        {isUploading ? (
            <>
                <span className="upload-icon">⏳</span>
                Uploading... {uploadProgress}%
            </>
        ) : (
            <>
                <span className="upload-icon">📤</span>
                Upload File
            </>
        )}
    </button>
);
};

export default UploadButton;
