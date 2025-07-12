# 📂 File Sharing Network App

A modern, network-enabled file sharing application built with React and Express.js that allows users to upload and share files seamlessly across local networks and the internet.

![File Sharing App](https://img.shields.io/badge/File%20Sharing-Network%20App-blue) ![React](https://img.shields.io/badge/React-19.1.0-61DAFB) ![Express](https://img.shields.io/badge/Express-5.1.0-000000) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## 🌟 Features

### Core Features
- **📤 File Upload**: Upload files of various types with drag-and-drop support
- **🔗 Instant Sharing**: Generate shareable download links immediately after upload
- **🌐 Network Access**: Access the application from any device on the same network
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Real-time Progress**: Live upload progress tracking
- **📊 Download Counter**: Track how many times files have been downloaded

### Security & Performance
- **🔒 File Type Validation**: Configurable allowed file types
- **📏 Size Limits**: Configurable maximum file size (default 500MB)
- **🛡️ CORS Protection**: Secure cross-origin resource sharing
- **⚠️ Error Handling**: Comprehensive error handling and user feedback
- **🚀 Optimized Performance**: Efficient file handling and storage

### Network Features
- **🌍 Network Discovery**: Automatic IP address detection
- **🔧 Network Configuration**: Easy network setup and configuration
- **📡 Server Status Monitoring**: Real-time server connectivity status
- **🔄 Auto-retry**: Automatic connection retry on network issues

### Technical Features
- **📁 Persistent Storage**: MongoDB database for file metadata
- **🏗️ Modular Architecture**: Clean, maintainable code structure
- **🎣 Custom Hooks**: Reusable React hooks for common functionality
- **🎨 Modern UI**: Beautiful, intuitive user interface
- **📦 Component-based**: Reusable UI components

## 🏗️ Project Structure

```
File_sharing/
├── 📄 README.md                    # Project documentation
├── 📦 package.json                 # Root package configuration
├── 🔒 .gitignore                   # Git ignore rules
├── 🖥️ client/                      # React frontend application
│   ├── 📦 package.json             # Client dependencies
│   ├── 🔧 network-config.jsx       # Network configuration utility
│   ├── 🏗️ build/                   # Production build output
│   ├── 🌐 public/                  # Static public assets
│   │   ├── 📄 index.html           # Main HTML template
│   │   ├── 🎯 favicon.svg          # App favicon
│   │   └── 🎨 logo.svg             # App logo
│   └── 💻 src/                     # Source code
│       ├── 🎨 App.css              # Main app styles
│       ├── ⚛️ App.jsx              # Main app component
│       ├── 🧪 App.test.jsx         # App tests
│       ├── 🎨 index.css            # Global styles
│       ├── 🚀 index.jsx            # App entry point
│       ├── 📊 reportWebVitals.jsx  # Performance monitoring
│       ├── 🔧 setupTests.jsx       # Test configuration
│       ├── 🧩 components/          # Reusable UI components
│       │   ├── 📄 index.jsx        # Component exports
│       │   ├── 📋 CopyMessage/     # Copy feedback component
│       │   ├── 📁 FileResult/      # File result display
│       │   ├── 🎯 Header/          # App header
│       │   ├── 🎨 Logo/            # Logo component
│       │   ├── 🌐 NetworkInfo/     # Network information display
│       │   ├── 📡 NetworkStatus/   # Network status indicator
│       │   ├── 📊 ProgressBar/     # Upload progress bar
│       │   └── 📤 UploadButton/    # File upload button
│       ├── 🎣 hooks/               # Custom React hooks
│       │   ├── 📄 index.jsx        # Hook exports
│       │   ├── 📋 useCopyToClipboard.jsx   # Clipboard functionality
│       │   ├── 📤 useFileUpload.jsx        # File upload logic
│       │   └── 🌐 useNetworkStatus.jsx     # Network status monitoring
│       └── 🔌 services/            # API and external services
│           └── 🌐 api.jsx          # API communication layer
└── 🖥️ server/                      # Express.js backend
    ├── 📦 package.json             # Server dependencies
    ├── 🔒 .env                     # Environment variables (not in git)
    ├── 📋 .env.example             # Environment template
    ├── 🚀 index.js                 # Server entry point
    ├── 🎮 controller/              # Route controllers
    │   └── 🖼️ image-controller.js  # File upload/download controller
    ├── 💾 database/                # Database configuration
    │   └── 🔗 db.js                # MongoDB connection
    ├── 📊 models/                  # Database models
    │   └── 📄 file.js              # File model schema
    ├── 🛤️ routes/                  # API routes
    │   └── 🗺️ routes.js            # Route definitions
    ├── 📁 uploads/                 # File storage directory
    └── 🔧 utils/                   # Utility functions
        └── 📤 upload.js            # Multer upload configuration
```

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 19.1.0** - Modern UI library with latest features
- **🎣 Custom Hooks** - Reusable state management logic
- **📦 Axios** - HTTP client for API communication
- **🎨 CSS3** - Modern styling with responsive design
- **📱 Mobile-First Design** - Optimized for all devices

### Backend
- **🟢 Node.js** - JavaScript runtime environment
- **🚀 Express.js 5.1.0** - Fast, minimalist web framework
- **📦 Multer** - File upload middleware
- **🔒 CORS** - Cross-origin resource sharing
- **🔧 dotenv** - Environment variable management

### Database
- **🍃 MongoDB Atlas** - Cloud NoSQL database
- **📊 Mongoose** - MongoDB object modeling

### Development Tools
- **📦 npm** - Package management
- **🔄 Nodemon** - Development server auto-restart
- **🏃 Concurrently** - Run multiple commands simultaneously
- **🧪 Jest & React Testing Library** - Testing framework

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (or local MongoDB installation)

### 1. Clone the Repository
```bash
git clone https://github.com/ReddyRohith-E/File_Sharing_App.git
cd File_Sharing_App
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm run install-all
```
or manually:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Environment Configuration

#### Server Environment Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Copy the example environment file:
```bash
copy .env.example .env
```

3. Edit the `.env` file with your configuration:
```env
# Database Configuration
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_CLUSTER=your_cluster_url
MONGODB_DATABASE_NAME=your_database_name

# Server Configuration
PORT=8000
HOST=0.0.0.0

# File Upload Configuration
MAX_FILE_SIZE=524288000
UPLOAD_DIR=uploads

# Allowed file types (comma-separated)
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document

# Environment
NODE_ENV=development
```

#### MongoDB Atlas Setup
1. Create a [MongoDB Atlas](https://www.mongodb.com/atlas) account
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Update the `.env` file with your credentials

### 4. Start the Application

#### Development Mode
```bash
# Start both client and server concurrently
npm run dev
```

#### Production Mode
```bash
# Build the client
npm run build

# Start the server
npm run server
```

#### Individual Services
```bash
# Start only the server
npm run server

# Start only the client
npm run client

# Start client for network access
npm run client-network
```

## 🌐 Network Configuration

### Local Network Access

1. **Find Your IP Address:**
   - **Windows:** `ipconfig`
   - **Mac/Linux:** `ifconfig`

2. **Configure Network Settings:**
```bash
# Run network configuration utility
npm run network-config
```

3. **Access from Other Devices:**
   - Open `http://YOUR_IP_ADDRESS:3000` on any device in your network
   - Server API: `http://YOUR_IP_ADDRESS:8000`

### Firewall Configuration
Make sure to allow traffic on ports 3000 (client) and 8000 (server) through your firewall.

## 📊 API Endpoints

### File Operations
- **POST** `/upload` - Upload a file
- **GET** `/file/:fileId` - Download a file

### Server Status
- **GET** `/` - Server health check

## 🔧 Configuration Options

### File Upload Limits
- **Maximum file size:** 500MB (configurable via `MAX_FILE_SIZE`)
- **Allowed file types:** Configurable via `ALLOWED_FILE_TYPES`
- **Upload directory:** Configurable via `UPLOAD_DIR`

### Supported File Types (Default)
- Images: JPEG, PNG
- Documents: PDF, DOC, DOCX
- Text files: TXT
- *(Configurable in environment variables)*

## 🧪 Testing

```bash
# Run client tests
cd client && npm test

# Run server tests (if available)
cd server && npm test
```

## 🚀 Deployment

### Client Deployment
1. Build the production version:
```bash
cd client && npm run build
```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Server Deployment
1. Set up environment variables on your hosting platform
2. Deploy to services like Heroku, Railway, or DigitalOcean
3. Update the client's API URL to point to your deployed server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔧 Troubleshooting

### Common Issues

1. **Server not starting:**
   - Check if MongoDB credentials are correct
   - Ensure PORT 8000 is not in use
   - Verify environment variables are set

2. **File upload failing:**
   - Check file size limits
   - Verify file type is allowed
   - Ensure uploads directory exists

3. **Network access issues:**
   - Check firewall settings
   - Verify IP address configuration
   - Ensure devices are on the same network

4. **Database connection errors:**
   - Verify MongoDB Atlas credentials
   - Check network connectivity
   - Ensure IP whitelist includes your IP

### Performance Optimization
- Use a CDN for file delivery in production
- Implement file compression
- Add caching mechanisms
- Consider using a dedicated file storage service (AWS S3, etc.)

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] File encryption and security
- [ ] File preview functionality
- [ ] Batch file uploads
- [ ] File sharing expiration
- [ ] Advanced file management
- [ ] Real-time notifications
- [ ] File compression
- [ ] Cloud storage integration
