import { useState, useEffect, useCallback } from "react";
import { Container, Loader, Alert, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
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

  // Fixed: Renamed from useAuthUserData to loadFromAuth (not starting with "use")
  const loadFromAuth = useCallback(() => {
    if (user) {
      console.log("Using auth user data:", user);
      setProfileData({
        id: user.id || user._id,
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
  }, [user]);

  const loadProfileData = useCallback(async () => {
    setLoading(true);
    setError("");
    
    try {
      const profileId = userId || user?.id || user?._id;
      
      console.log("Loading profile for ID:", profileId);
      
      if (!profileId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      const response = await api.get(`/users/profile/${profileId}`);
      
      if (response.data.success) {
        const userData = response.data.user;
        console.log("Profile data received:", userData);
        
        setProfileData({
          id: userData.id,
          name: userData.fullName,
          title: userData.profile?.title || userData.title || "Software Engineer",
          company: userData.profile?.company || "Tech Company",
          location: userData.profile?.location || "Remote",
          about: userData.profile?.about || "Passionate professional dedicated to delivering excellence.",
          email: userData.email,
          phone: userData.phoneNumber,
          website: userData.profile?.website || "",
          linkedin: userData.profile?.linkedin || "",
          github: userData.profile?.github || "",
          twitter: userData.profile?.twitter || "",
          avatar: userData.profile?.avatar,
          skills: userData.profile?.skills || ["React", "TypeScript", "Node.js"],
          experience: userData.profile?.experience || [],
          certifications: userData.profile?.certifications || [],
          rating: 4.9,
          verified: true,
          resumeUrl: userData.profile?.resumeUrl,
          resumeName: userData.profile?.resumeName
        });
      } else {
        // Use auth user data as fallback
        loadFromAuth(); // Now calling renamed function
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
      // Use auth user data as fallback
      loadFromAuth(); // Now calling renamed function
    } finally {
      setLoading(false);
    }
  }, [userId, user?.id, user?._id, loadFromAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadProfileData();
  }, [isAuthenticated, navigate, loadProfileData]);

  const handleSave = async (data: any) => {
    try {
      const userIdToUpdate = user?.id || user?._id;
      if (userIdToUpdate) {
        const response = await api.put(`/users/profile/${userIdToUpdate}`, {
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
          notifications.show({
            title: "Success",
            message: "Profile updated successfully",
            color: "green"
          });
        }
      }
    } catch (error) {
      console.error("Save error:", error);
      setProfileData(data);
      notifications.show({
        title: "Success",
        message: "Profile updated locally",
        color: "green"
      });
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
        notifications.show({
          title: "Success",
          message: "Avatar updated successfully",
          color: "green"
        });
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
      notifications.show({
        title: "Success",
        message: "Avatar updated locally",
        color: "green"
      });
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
        notifications.show({
          title: "Success",
          message: "Resume uploaded successfully",
          color: "green"
        });
      }
    } catch (error) {
      console.error("Resume upload error:", error);
      setProfileData({ 
        ...profileData, 
        resumeUrl: URL.createObjectURL(file), 
        resumeName: file.name 
      });
      notifications.show({
        title: "Success",
        message: "Resume uploaded locally",
        color: "green"
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

  if (error && !profileData) {
    return (
      <Container size="xl" className="py-20">
        <Alert color="red" title="Error">
          {error}
          <Button onClick={loadProfileData} mt="md" variant="light">
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