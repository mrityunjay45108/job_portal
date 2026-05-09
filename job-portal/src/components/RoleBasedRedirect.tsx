// src/components/RoleBasedRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader, Container } from "@mantine/core";

const RoleBasedRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (user?.role === "candidate") {
        navigate("/candidate-dashboard");
      } else if (user?.role === "recruiter") {
        navigate("/Recruiter-Dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  if (loading) {
    return (
      <Container className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </Container>
    );
  }

  return null;
};

export default RoleBasedRedirect;