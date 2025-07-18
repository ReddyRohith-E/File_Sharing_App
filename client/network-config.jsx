#!/usr/bin/env node

const os = require('os');
const fs = require('fs');
const path = require('path');

function getNetworkInterfaces() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (let interfaceName in interfaces) {
        const interfaceInfo = interfaces[interfaceName];
        for (let i = 0; i < interfaceInfo.length; i++) {
            const alias = interfaceInfo[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                addresses.push({
                    interface: interfaceName,
                    address: alias.address
                });
            }
        }
    }
    
    return addresses;
}

function updateEnvFile(silent = false) {
    const addresses = getNetworkInterfaces();
    
    if (addresses.length === 0) {
        if (!silent) console.log('❌ No network interfaces found. Using localhost.');
        return false;
    }
    
    const primaryIP = addresses[0].address;
    const envContent = `# Auto-generated network configuration
# Generated on ${new Date().toISOString()}
REACT_APP_API_URL=http://${primaryIP}:8000
HOST=0.0.0.0

# Alternative IP addresses found:
${addresses.slice(1).map(addr => `# REACT_APP_API_URL=http://${addr.address}:8000`).join('\n')}
`;
    
    const clientEnvPath = path.join(__dirname, '.env');
    try {
        fs.writeFileSync(clientEnvPath, envContent);
        if (!silent) {
            console.log(`✅ Updated .env file with current IP: ${primaryIP}`);
        }
        return primaryIP;
    } catch (error) {
        if (!silent) {
            console.log(`⚠️  Could not update .env file: ${error.message}`);
        }
        return false;
    }
}

function generateNetworkConfig() {
    const addresses = getNetworkInterfaces();
    
    console.log('\n🌐 File Sharing App - Network Configuration\n');
    console.log('Available network interfaces:');
    
    if (addresses.length === 0) {
        console.log('❌ No network interfaces found. Make sure you are connected to a network.');
        return;
    }
    
    addresses.forEach((addr, index) => {
        console.log(`${index + 1}. ${addr.interface}: ${addr.address}`);
    });
    
    console.log('\n📋 Configuration Instructions:');
    console.log('1. Choose your primary network interface from above');
    console.log('2. The .env file will be auto-updated with:');
    
    if (addresses.length > 0) {
        const primaryIP = addresses[0].address;
        console.log(`   REACT_APP_API_URL=http://${primaryIP}:8000`);
        
        // Auto-generate .env file
        updateEnvFile();
    }
    
    console.log('\n🚀 To start network sharing:');
    console.log('1. Server: npm run start (in server folder)');
    console.log('2. Client: npm start (in client folder)');
    console.log('\n📱 Share these URLs with users on your network:');
    addresses.forEach(addr => {
        console.log(`   Client: http://${addr.address}:3000`);
        console.log(`   Server: http://${addr.address}:8000`);
    });
    
    console.log('\n💡 Tips:');
    console.log('- Make sure Windows Firewall allows Node.js/npm');
    console.log('- All devices must be on the same network (WiFi/LAN)');
    console.log('- The server must be running before starting the client');
    console.log('- IP address is automatically updated on each run');
}

if (require.main === module) {
    generateNetworkConfig();
}

module.exports = { getNetworkInterfaces, generateNetworkConfig, updateEnvFile };
