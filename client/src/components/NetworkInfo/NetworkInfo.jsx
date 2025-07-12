import React from 'react';
import './NetworkInfo.css';

const NetworkInfo = ({ networkInfo, getServerIP, onCopyToClipboard }) => {
  return (
    <div className="network-info">
      <h3>Network Access Information</h3>
      
      <div className="info-item">
        <strong>Client URL:</strong> 
        <span>{networkInfo.clientUrl}</span>
        <button 
          onClick={() => onCopyToClipboard(networkInfo.clientUrl)}
          aria-label="Copy client URL"
        >
          📋
        </button>
      </div>
      
      <div className="info-item">
        <strong>Server URL:</strong> 
        <span>{networkInfo.serverUrl}</span>
        <button 
          onClick={() => onCopyToClipboard(networkInfo.serverUrl)}
          aria-label="Copy server URL"
        >
          📋
        </button>
      </div>
      
      <div className="info-item">
        <strong>Server IP:</strong> 
        <span>{getServerIP()}</span>
        <button 
          onClick={() => onCopyToClipboard(getServerIP())}
          aria-label="Copy server IP"
        >
          📋
        </button>
      </div>
      
      <div className="network-instructions">
        <p><strong>To access from other devices:</strong></p>
        <ol>
          <li>Ensure all devices are on the same network</li>
          <li>Share the Client URL above with other users</li>
          <li>Files uploaded here will be accessible from any device on the network</li>
        </ol>
      </div>
    </div>
  );
};

export default NetworkInfo;
