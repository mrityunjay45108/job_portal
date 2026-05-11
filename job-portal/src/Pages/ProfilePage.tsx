import { useState, useEffect } from "react";
import { Container, Loader, Alert, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProfileData();
  }, [userId, user, isAuthenticated]);

  //  Fixed: Renamed from useAuthUserData to loadFromAuth (not starting with "use")
  const loadFromAuth = () => {
    if (user) {
      setProfileData({
        id: user.id,
        name: user.fullName,
        title: user.profile?.title || "Professional",
        company: user.profile?.company || "",
        location: user.profile?.location || "",
        about: user.profile?.about || "",
        email: user.email,
        phone: user.phoneNumber,
        website: user.profile?.website || "",
        linkedin: user.profile?.linkedin || "",
        github: user.profile?.github || "",
        twitter: user.profile?.twitter || "",
        avatar: user.profile?.avatar,
        skills: user.profile?.skills || [],
        experience: user.profile?.experience || [],
        certifications: user.profile?.certifications || [],
        rating: 4.9,
        verified: true,
        resumeUrl: user.profile?.resumeUrl,
        resumeName: user.profile?.resumeName
      });
    }
  };

  const fetchProfileData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const profileId = userId || user?.id;
      
      if (!profileId) {
        setError("User not found");
        setLoading(false);
        return;
      }

      // Try to get from API
      const response = await api.get(`/users/profile/${profileId}`);
      
      if (response.data.success) {
        setProfileData(response.data.user);
      } else {
        // Use auth user data as fallback
        loadFromAuth(); // ✅ Now calling renamed function
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
      // Use auth user data as fallback
      loadFromAuth(); // ✅ Now calling renamed function
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      const response = await api.put(`/users/profile/${user?.id}`, {
        name: data.name,
        title: data.title,
        company: data.company,
        location: data.location,
        about: data.about,
        email: data.email,
        phone: data.phone,
        website: data.website,
        linkedin: data.linkedin,
        github: data.github,
        twitter: data.twitter,
        skills: data.skills
      });
      
      if (response.data.success) {
        setProfileData(response.data.user);
      } else {
        setProfileData(data);
      }
    } catch (error) {
      console.error("Save error:", error);
      setProfileData(data);
    }
  };

  const handleAvatarChange = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    
    try {
      const response = await api.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.data.success) {
        setProfileData({ ...profileData, avatar: response.data.url });
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);
    
    try {
      const response = await api.post("/users/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.data.success) {
        setProfileData({ 
          ...profileData, 
          resumeUrl: response.data.url, 
          resumeName: file.name 
        });
      }
    } catch (error) {
      console.error("Resume upload error:", error);
      setProfileData({ 
        ...profileData, 
        resumeUrl: URL.createObjectURL(file), 
        resumeName: file.name 
      });
    }
  };

  if (authLoading || loading) {
    return (
      <Container size="xl" className="py-20 flex justify-center">
        <Loader size="lg" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" className="py-20">
        <Alert color="red" title="Error">
          {error}
          <Button onClick={fetchProfileData} mt="md" variant="light">
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container size="xl" className="py-20">
        <Alert color="yellow" title="No Data">
          No profile data found. Please update your profile from dashboard.
          <Button onClick={() => navigate("/dashboard")} mt="md" variant="light">
            Go to Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" className="py-8">
      <Profile 
        {...profileData}
        isEditable={true}
        onSave={handleSave}
        onAvatarChange={handleAvatarChange}
        onResumeUpload={handleResumeUpload}
      />
    </Container>
  );
};

export default ProfilePage;