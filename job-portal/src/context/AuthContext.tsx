// // src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

// interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   role: 'candidate' | 'recruiter';
//   phoneNumber?: string;
//   profile?: any;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   isAuthenticated: boolean;
//   isCandidate: boolean;
//   isRecruiter: boolean;
//   login: (email: string, password: string) => Promise<{ success: boolean; message?: string; role?: string }>;
//   register: (userData: any) => Promise<{ success: boolean; message?: string; user?: any }>;
//   logout: () => void;
//   updateProfile: (profileData: any) => Promise<{ success: boolean; message?: string }>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
  
//   const loginInProgress = useRef(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const response = await api.get('/auth/me');
//       if (response.data.success) {
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       localStorage.removeItem('token');
//       delete axios.defaults.headers.common['Authorization'];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     if (loginInProgress.current) {
//       return { success: false, message: 'Login already in progress' };
//     }

//     loginInProgress.current = true;

//     try {
//       console.log('📝 Sending login request to:', `${api.defaults.baseURL}/auth/login`);
//       const response = await api.post('/auth/login', { email, password });
      
//       console.log('✅ Login response:', response.data);
      
//       const { token, user: userData } = response.data;
      
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setUser(userData);
      
//       return { success: true, role: userData.role };
//     } catch (error: any) {
//       console.error('❌ Login error:', error.response?.data || error.message);
      
//       // Handle specific error cases
//       if (error.response?.status === 401) {
//         return { success: false, message: 'Invalid email or password' };
//       }
//       if (error.response?.status === 404) {
//         return { success: false, message: 'Server not found. Please try again later.' };
//       }
//       if (error.code === 'ECONNABORTED') {
//         return { success: false, message: 'Request timeout. Please try again.' };
//       }
//       if (!error.response) {
//         return { success: false, message: 'Cannot connect to server. Please make sure backend is running on port 5000.' };
//       }
      
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Login failed. Please try again.' 
//       };
//     } finally {
//       loginInProgress.current = false;
//     }
//   };

//   const register = async (userData: any) => {
//     try {
//       console.log('📝 Sending registration request to:', `${api.defaults.baseURL}/auth/register`);
//       const response = await api.post('/auth/register', userData);
//       const { token, user } = response.data;
      
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setUser(user);
      
//       return { success: true, user };
//     } catch (error: any) {
//       console.error('❌ Registration error:', error.response?.data || error.message);
      
//       if (!error.response) {
//         return { success: false, message: 'Cannot connect to server. Please make sure backend is running on port 5000.' };
//       }
      
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Registration failed. Please try again.' 
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//     navigate('/login');
//   };

//   const updateProfile = async (profileData: any) => {
//     try {
//       const response = await api.put('/auth/profile', profileData);
//       setUser(response.data.user);
//       return { success: true };
//     } catch (error: any) {
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Failed to update profile' 
//       };
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading,
//       isAuthenticated: !!user,
//       isCandidate: user?.role === 'candidate',
//       isRecruiter: user?.role === 'recruiter',
//       login,
//       register,
//       logout,
//       updateProfile
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };









import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  _id?: string;
  fullName: string;
  email: string;
  role: 'candidate' | 'recruiter';
  phoneNumber?: string;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isCandidate: boolean;
  isRecruiter: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; role?: string }>;
  register: (userData: any) => Promise<{ success: boolean; message?: string; user?: any }>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const loginInProgress = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        const userData = response.data.user;
        // Ensure user has id field
        const normalizedUser = {
          ...userData,
          id: userData.id || userData._id,
          _id: userData._id
        };
        setUser(normalizedUser);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (loginInProgress.current) {
      return { success: false, message: 'Login already in progress' };
    }

    loginInProgress.current = true;

    try {
      console.log('📝 Sending login request to:', `${api.defaults.baseURL}/auth/login`);
      const response = await api.post('/auth/login', { email, password });
      
      console.log('✅ Login response:', response.data);
      
      const { token, user: userData } = response.data;
      
      // ✅ Ensure user has id field
      const normalizedUser = {
        ...userData,
        id: userData.id || userData._id,
        _id: userData._id
      };
      
      console.log('✅ Normalized user:', normalizedUser);
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(normalizedUser);
      
      return { success: true, role: normalizedUser.role };
    } catch (error: any) {
      console.error('❌ Login error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return { success: false, message: 'Invalid email or password' };
      }
      if (error.response?.status === 404) {
        return { success: false, message: 'Server not found. Please try again later.' };
      }
      if (error.code === 'ECONNABORTED') {
        return { success: false, message: 'Request timeout. Please try again.' };
      }
      if (!error.response) {
        return { success: false, message: 'Cannot connect to server. Please make sure backend is running on port 5000.' };
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    } finally {
      loginInProgress.current = false;
    }
  };

  const register = async (userData: any) => {
    try {
      console.log('📝 Sending registration request to:', `${api.defaults.baseURL}/auth/register`);
      const response = await api.post('/auth/register', userData);
      const { token, user: userDataResponse } = response.data;
      
      // ✅ Ensure user has id field
      const normalizedUser = {
        ...userDataResponse,
        id: userDataResponse.id || userDataResponse._id,
        _id: userDataResponse._id
      };
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(normalizedUser);
      
      return { success: true, user: normalizedUser };
    } catch (error: any) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      
      if (!error.response) {
        return { success: false, message: 'Cannot connect to server. Please make sure backend is running on port 5000.' };
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const updateProfile = async (profileData: any) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      const updatedUser = response.data.user;
      const normalizedUser = {
        ...updatedUser,
        id: updatedUser.id || updatedUser._id,
        _id: updatedUser._id
      };
      setUser(normalizedUser);
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      isCandidate: user?.role === 'candidate',
      isRecruiter: user?.role === 'recruiter',
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};