import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        >
          <div className="progress-shimmer"></div>
        </div>
      </div>
      <div className="progress-text">
        {progress}% uploaded
      </div>
    </div>
  );
};

export default ProgressBar;
