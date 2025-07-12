import React from 'react';
import './CopyMessage.css';

const CopyMessage = ({ message, isVisible }) => {
  if (!isVisible || !message) return null;

  return (
    <div className="copy-message">
      <span className="copy-icon">✓</span>
      {message}
    </div>
  );
};

export default CopyMessage;
