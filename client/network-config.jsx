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
    console.log('2. Create a .env file in the client folder with:');
    
    if (addresses.length > 0) {
        const primaryIP = addresses[0].address;
        console.log(`   REACT_APP_API_URL=http://${primaryIP}:8000`);
        
        // Auto-generate .env file
        const envContent = `# Auto-generated network configuration
# Generated on ${new Date().toISOString()}
REACT_APP_API_URL=http://${primaryIP}:8000

# Alternative IP addresses found:
${addresses.slice(1).map(addr => `# REACT_APP_API_URL=http://${addr.address}:8000`).join('\n')}
`;
        
        const clientEnvPath = path.join(__dirname, '.env');
        try {
            fs.writeFileSync(clientEnvPath, envContent);
            console.log(`\n✅ Auto-generated .env file with IP: ${primaryIP}`);
        } catch (error) {
            console.log(`\n⚠️  Could not auto-generate .env file: ${error.message}`);
            console.log('Please create it manually.');
        }
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
}

if (require.main === module) {
    generateNetworkConfig();
}

module.exports = { getNetworkInterfaces, generateNetworkConfig };
