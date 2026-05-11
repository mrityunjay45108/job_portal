import { Navigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const token = localStorage.getItem('adminToken');
  const adminData = localStorage.getItem('adminData');
  
  if (!token || !adminData) {
    notifications.show({
      title: 'Access Denied',
      message: 'Please login as admin to access this page',
      color: 'red',
    });
    return <Navigate to="/admin/login" replace />;
  }
  
  // Optional: Check if token is expired
  try {
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    if (tokenData.exp * 1000 < Date.now()) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      notifications.show({
        title: 'Session Expired',
        message: 'Please login again',
        color: 'red',
      });
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    console.error('Token validation error:', error);
  }
  
  return <>{children}</>;
};

export default AdminProtectedRoute;