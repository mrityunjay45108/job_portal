// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader, Container, Text } from "@mantine/core";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({ allowedRoles = [], redirectTo = "/login" }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader size="lg" />
          <Text className="mt-4 text-gray-500">Loading...</Text>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || "")) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === "recruiter") {
      return <Navigate to="/Recruiter-Dashboard" replace />;
    } else if (user?.role === "candidate") {
      return <Navigate to="/candidate-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;