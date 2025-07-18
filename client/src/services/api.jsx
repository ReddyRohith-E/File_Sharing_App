import axios from 'axios';

// Function to get the current host's IP address for network sharing
const getApiUrl = () => {
    // Check if environment variable is set (for production or custom setup)
    if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    }
    
    // For development, try to use the same host as the frontend
    const hostname = window.location.hostname;
    const port = '8000'; // Server port
    
    // If accessing via localhost, keep localhost for development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return `http://localhost:${port}`;
    }
    
    // For network access, use the current hostname
    return `http://${hostname}:${port}`;
};

const API_URL = getApiUrl();

console.log('API URL:', API_URL);

// Add axios interceptor for better error handling and network detection
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
            console.error('Network connection failed. Please ensure the server is running.');
        }
        return Promise.reject(error);
    }
);

export const uploadFile = async (data) => {
    try {
        let response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    } catch (error) {
        console.error('Error while calling API:', error.message);
        if (error.response) {
            return { error: error.response.data.message || 'Server error' };
        } else if (error.request) {
            return { error: 'Network error. Please check your connection and server status.' };
        } else {
            return { error: 'An unexpected error occurred.' };
        }
    }
};

export const getServerStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return { status: 'connected', message: response.data };
    } catch (error) {
        return { status: 'error', message: 'Server unreachable' };
    }
};

export const getNetworkInfo = () => {
    const hostname = window.location.hostname;
    const port = window.location.port || '3000';
    return {
        clientUrl: `http://${hostname}:${port}`,
        serverUrl: API_URL,
        isNetworkAccess: hostname !== 'localhost' && hostname !== '127.0.0.1'
    };
};

export const getSupportedFileTypes = async () => {
    try {
        const response = await axios.get(`${API_URL}/supported-files`);
        return { status: 'success', data: response.data };
    } catch (error) {
        console.error('Error fetching supported file types:', error.message);
        // Return default supported types if server is unavailable
        return {
            status: 'fallback',
            data: {
                allowedTypes: [
                    'image/jpeg',
                    'image/png',
                    'application/pdf',
                    'text/plain',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ],
                maxFileSize: 524288000, // 500MB
                acceptAttribute: '.jpg,.jpeg,.png,.pdf,.txt,.doc,.docx'
            }
        };
    }
};