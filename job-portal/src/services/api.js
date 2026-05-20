// // src/services/api.js
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   //  Don't set default Content-Type
//   timeout: 30000,
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     console.log(` ${config.method?.toUpperCase()} ${config.url}`);
    
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     // Only set JSON content-type if data is not FormData
//     if (!(config.data instanceof FormData)) {
//       config.headers['Content-Type'] = 'application/json';
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`📥 ${response.config.url} - ${response.status}`);
//     return response;
//   },
//   (error) => {
//     console.error('API Error:', error.response?.status, error.message);
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;



// src/services/api.js
import axios from 'axios';

// Dynamically determine API URL based on environment
const getApiUrl = () => {
  // Production environment
  if (process.env.NODE_ENV === 'production') {
    // Use environment variable if set, otherwise use relative path
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
    // For same-domain deployment (backend and frontend on same domain)
    return '/api';
  }
  
  // Development environment
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

console.log(`🔧 API URL: ${API_URL} (${process.env.NODE_ENV} mode)`);

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: true, // Important for cookies
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Only set JSON content-type if data is not FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    // Handle network errors (backend not running)
    if (error.code === 'ERR_NETWORK') {
      console.error('❌ Network Error: Cannot connect to server');
      
      // Custom error for network issues
      const networkError = {
        ...error,
        message: process.env.NODE_ENV === 'production' 
          ? 'Cannot connect to server. Please check your internet connection.'
          : 'Cannot connect to server. Please make sure backend is running on port 5000.'
      };
      
      return Promise.reject(networkError);
    }
    
    console.error('API Error:', error.response?.status, error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/test');
    return response.data.success === true;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
};

export default api;