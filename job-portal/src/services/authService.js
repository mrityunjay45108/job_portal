import api from './api';

export const register = async (userData) => {
  try {
    console.log('Sending registration request:', userData);
    const response = await api.post('/auth/register', userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error details:', error);
    console.error('Error response:', error.response);
    
    if (error.response) {
      // Server responded with error
      return error.response.data || { 
        success: false, 
        message: error.response.data?.message || 'Registration failed' 
      };
    } else if (error.request) {
      // Request was made but no response
      return { 
        success: false, 
        message: 'Server not responding. Please check if backend is running.' 
      };
    } else {
      // Something else happened
      return { 
        success: false, 
        message: error.message || 'Registration failed' 
      };
    }
  }
};

export const login = async (email, password) => {
  try {
    console.log('Sending login request:', { email });
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error details:', error);
    
    if (error.response) {
      return error.response.data || { 
        success: false, 
        message: error.response.data?.message || 'Login failed' 
      };
    } else if (error.request) {
      return { 
        success: false, 
        message: 'Server not responding. Please check if backend is running.' 
      };
    } else {
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    return { success: false };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', { profile: profileData });
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    return error.response?.data || { 
      success: false, 
      message: 'Update failed' 
    };
  }
};