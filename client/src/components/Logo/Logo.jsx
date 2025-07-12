import React from 'react';
import './Logo.css';

const Logo = ({ size = 120, className = '' }) => {
  return (
    <div className={`logo-wrapper ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="app-logo"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#00bfff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#0080ff', stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="fileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#f0f8ff', stopOpacity: 0.8}} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Background Circle */}
        <circle cx="60" cy="60" r="55" fill="url(#bgGradient)" filter="url(#shadow)"/>
        
        {/* Network Lines */}
        <g stroke="#ffffff" strokeWidth="2" opacity="0.6">
          <line x1="30" y1="30" x2="90" y2="90"/>
          <line x1="90" y1="30" x2="30" y2="90"/>
          <circle cx="30" cy="30" r="4" fill="#ffffff"/>
          <circle cx="90" cy="30" r="4" fill="#ffffff"/>
          <circle cx="30" cy="90" r="4" fill="#ffffff"/>
          <circle cx="90" cy="90" r="4" fill="#ffffff"/>
        </g>
        
        {/* Main File Icon */}
        <g transform="translate(35, 25)">
          {/* File Background */}
          <path d="M5 10 L5 65 L45 65 L45 20 L35 10 Z" fill="url(#fileGradient)" stroke="#00bfff" strokeWidth="2"/>
          {/* File Corner */}
          <path d="M35 10 L35 20 L45 20" fill="none" stroke="#00bfff" strokeWidth="2"/>
          
          {/* File Content Lines */}
          <line x1="12" y1="25" x2="35" y2="25" stroke="#00bfff" strokeWidth="1.5" opacity="0.7"/>
          <line x1="12" y1="32" x2="38" y2="32" stroke="#00bfff" strokeWidth="1.5" opacity="0.7"/>
          <line x1="12" y1="39" x2="33" y2="39" stroke="#00bfff" strokeWidth="1.5" opacity="0.7"/>
          <line x1="12" y1="46" x2="36" y2="46" stroke="#00bfff" strokeWidth="1.5" opacity="0.7"/>
        </g>
        
        {/* Share Arrow */}
        <g transform="translate(70, 50)">
          <path d="M0 0 L15 5 L0 10 L3 5 Z" fill="#ffffff" opacity="0.9"/>
          <line x1="3" y1="5" x2="25" y2="5" stroke="#ffffff" strokeWidth="2" opacity="0.9"/>
        </g>
        
        {/* Upload Arrow */}
        <g transform="translate(45, 75)">
          <path d="M15 0 L20 10 L15 7 L15 20 L15 7 L10 10 Z" fill="#ffffff" opacity="0.8"/>
        </g>
        
        {/* Network Dots */}
        <circle cx="20" cy="60" r="3" fill="#ffffff" opacity="0.7"/>
        <circle cx="100" cy="60" r="3" fill="#ffffff" opacity="0.7"/>
        <circle cx="60" cy="20" r="3" fill="#ffffff" opacity="0.7"/>
        <circle cx="60" cy="100" r="3" fill="#ffffff" opacity="0.7"/>
      </svg>
      
      <div className="logo-title">
        <span className="logo-text">FileSync</span>
        <span className="logo-subtitle">Connect & Share</span>
      </div>
    </div>
  );
};

export default Logo;
