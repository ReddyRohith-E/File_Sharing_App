import React from 'react';
import './FileResult.css';

const FileResult = ({ result, onCopyToClipboard, onRetryConnection }) => {
  const isError = result.startsWith('Error:');
  
  if (isError) {
    return (
      <div className="error-section">
        <div className="error-icon">❌</div>
        <h3>Upload Failed</h3>
        <p>{result}</p>
        <button 
          onClick={onRetryConnection}
          className="retry-button"
          aria-label="Retry connection to server"
        >
          🔄 Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="result-section">
      <div className="success-icon">🎉</div>
      <h3>Upload Complete!</h3>
      
      <div className="download-link">
        <div className="link-container">
          <a 
            href={result} 
            target="_blank" 
            rel="noopener noreferrer"
            className="download-url"
            aria-label="Download uploaded file"
          >
            {result}
          </a>
        </div>
        <button 
          onClick={() => onCopyToClipboard(result)}
          className="copy-button"
          aria-label="Copy download link"
        >
          📋 Copy Link
        </button>
      </div>
      
      <p className="share-instruction">
        ✨ Your file is ready! Share this link with anyone on your network for instant access.
      </p>
    </div>
  );
};

export default FileResult;
