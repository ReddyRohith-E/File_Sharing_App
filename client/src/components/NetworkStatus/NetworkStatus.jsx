import React from 'react';
import './NetworkStatus.css';

const NetworkStatus = ({ 
  serverStatus, 
  showNetworkInfo, 
  onToggleNetworkInfo 
}) => {
  return (
    <div className="network-status">
      <div className={`status-indicator ${serverStatus.status}`}>
        <span className="status-dot"></span>
        <span>
          Server: {serverStatus.status === 'connected' ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <button 
        className="info-toggle"
        onClick={onToggleNetworkInfo}
        aria-label={`${showNetworkInfo ? 'Hide' : 'Show'} network information`}
      >
        {showNetworkInfo ? 'Hide' : 'Show'} Network Info
      </button>
    </div>
  );
};

export default NetworkStatus;
