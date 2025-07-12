import React from 'react';
import Logo from '../Logo/Logo.jsx';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <Logo size={80} />
            <div className="header-content">
                <h1>
                    Share Files Instantly
                    <span role="img" aria-label="upload" style={{ marginLeft: 8 }}>📂</span>
                </h1>
                <p className="subtitle">
                    Securely upload and access your files
                    <span role="img" aria-label="security" style={{ marginLeft: 6 }}>🔒 ✨</span>
                </p>
            </div>
        </header>
    );
};

export default Header;
