import { useState, useRef } from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Title,
  Text,
  Divider,
  Stack,
  Anchor,
  Progress,
  Card,
  Group,
  Badge,
  Alert
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconUser,
  IconBrandGoogle,
  IconBrandGithub,
  IconArrowLeft,
  IconBriefcase,
  IconCheck,
  IconBuilding,
  IconUsers,
  IconSparkles,
  IconShield,
  IconRocket,
  IconCircleCheck,
  IconPhone,
  IconMail,
  IconPassword
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  
  // Ref to prevent multiple submissions
  const isSubmitting = useRef(false);

  // Password strength calculator
  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return Math.min(strength, 4);
  };

  const passwordStrength = getPasswordStrength();
  const passwordPercent = (passwordStrength / 4) * 100;
  const passwordColor = 
    passwordStrength === 0 ? "gray" :
    passwordStrength === 1 ? "red" :
    passwordStrength === 2 ? "orange" :
    passwordStrength === 3 ? "yellow" : "green";
  
  const passwordLabel = 
    passwordStrength === 0 ? "Very weak" :
    passwordStrength === 1 ? "Weak" :
    passwordStrength === 2 ? "Fair" :
    passwordStrength === 3 ? "Good" : "Strong";

  // Function to initialize profile data after successful registration
  const initializeProfileData = (userId: string, userData: any) => {
    const initialProfile = {
      id: userId,
      name: userData.fullName,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phoneNumber,
      location: "",
      title: "",
      company: "",
      about: "",
      skills: [],
      experience: [],
      certifications: [],
      linkedin: "",
      github: "",
      website: "",
      avatar: "",
      banner: "",
      rating: 4.8,
      verified: false,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage with user-specific key
    localStorage.setItem(`candidate_full_profile_${userId}`, JSON.stringify(initialProfile));
    
    // Also save basic profile for dashboard
    localStorage.setItem("candidate_profile", JSON.stringify({
      id: userId,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phoneNumber,
      location: "",
      skills: [],
      bio: "",
      resumeName: "",
      linkedin: "",
      github: "",
      portfolio: ""
    }));
    
    console.log("✅ Profile initialized for user:", userId);
  };

  const handleSignup = async () => {
    // Clear previous error
    setError("");
    
    // Prevent multiple submissions
    if (loading || isSubmitting.current) {
      console.log("Registration already in progress");
      notifications.show({
        title: "Please Wait",
        message: "Registration already in progress...",
        color: "yellow"
      });
      return;
    }

    // Validation
    if (!fullName || !email || !password || !phoneNumber) {
      const errorMsg = "Please fill in all required fields";
      setError(errorMsg);
      notifications.show({
        title: "Missing Information",
        message: errorMsg,
        color: "red"
      });
      return;
    }

    // Name validation
    if (fullName.length < 3) {
      const errorMsg = "Full name must be at least 3 characters";
      setError(errorMsg);
      notifications.show({
        title: "Invalid Name",
        message: errorMsg,
        color: "red"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMsg = "Please enter a valid email address";
      setError(errorMsg);
      notifications.show({
        title: "Invalid Email",
        message: errorMsg,
        color: "red"
      });
      return;
    }

    // Password validation
    if (password.length < 6) {
      const errorMsg = "Password must be at least 6 characters";
      setError(errorMsg);
      notifications.show({
        title: "Password Too Short",
        message: errorMsg,
        color: "red"
      });
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      const errorMsg = "Please enter a valid 10-digit mobile number";
      setError(errorMsg);
      notifications.show({
        title: "Invalid Mobile Number",
        message: errorMsg,
        color: "red"
      });
      return;
    }

    if (!termsAccepted) {
      const errorMsg = "Please accept the Terms and Conditions";
      setError(errorMsg);
      notifications.show({
        title: "Terms Required",
        message: errorMsg,
        color: "red"
      });
      return;
    }

    setLoading(true);
    isSubmitting.current = true;
    
    try {
      // Send registration request to backend
      const result = await register({ 
        fullName,
        email,
        password,
        role,
        phoneNumber
      });

      console.log("Registration result:", result);

      if (result.success) {
        // Initialize profile data for the new user
        const userId = (result as any).user?.id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        initializeProfileData(userId, {
          fullName,
          email,
          phoneNumber,
          role
        });
        
        notifications.show({
          title: "Account Created Successfully! 🎉",
          message: `Welcome to JobPortal, ${fullName}! Redirecting to dashboard...`,
          color: "green",
          autoClose: 3000,
        });
        
        setTimeout(() => {
          navigate(role === "candidate" ? "/candidate-dashboard" : "/Recruiter-Dashboard");
        }, 1500);
      } else {
        // Handle specific error cases
        if (result.message?.includes("already exists") || result.message?.includes("already registered")) {
          const errorMsg = "An account with this email already exists. Please login instead.";
          setError(errorMsg);
          notifications.show({
            title: "Account Already Exists",
            message: errorMsg,
            color: "yellow",
            autoClose: 5000,
          });
        } else {
          setError(result.message || "Registration failed. Please try again.");
          notifications.show({
            title: "Registration Failed",
            message: result.message || "Something went wrong. Please try again.",
            color: "red"
          });
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMsg = error.message || "Something went wrong. Please try again.";
      setError(errorMsg);
      notifications.show({
        title: "Error",
        message: errorMsg,
        color: "red"
      });
    } finally {
      setLoading(false);
      // Reset submitting flag after delay
      setTimeout(() => {
        isSubmitting.current = false;
      }, 1000);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const features = [
    { icon: <IconSparkles size={18} />, text: "AI-Powered Job Matching" },
    { icon: <IconRocket size={18} />, text: "Fast Application Process" },
    { icon: <IconShield size={18} />, text: "Secure & Verified" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-20"
      >
        <Container size="lg" className="px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 cursor-pointer" 
              onClick={handleBackToHome}
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <IconBriefcase size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                JobPortal
              </span>
            </motion.div>
            <div className="flex items-center gap-3">
              <Text size="sm" className="text-gray-500">Already have an account?</Text>
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="light" color="blue" size="sm" radius="xl" className="font-semibold">
                    Sign In →
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </Container>
      </motion.div>

      <Container size="lg" className="py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left Side - Hero Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl"></div>
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Badge size="lg" variant="filled" color="blue" className="mb-4 px-4 py-2 rounded-full">
                    Join 50,000+ Professionals
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
                >
                  Create your{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    JobPortal
                  </span>{" "}
                  profile
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-500 mb-8 leading-relaxed"
                >
                  Search & apply to jobs from India's No.1 Job Site. Get matched with top companies instantly.
                </motion.p>

                {/* Feature List */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 mb-8"
                >
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <IconCircleCheck size={18} className="text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-8 pt-6 border-t border-gray-200"
                >
                  <div>
                    <div className="text-2xl font-bold text-blue-600">10,000+</div>
                    <div className="text-xs text-gray-500">Jobs Posted</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">50,000+</div>
                    <div className="text-xs text-gray-500">Active Seekers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">5,000+</div>
                    <div className="text-xs text-gray-500">Companies</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Sign Up Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <Paper shadow="2xl" radius="xl" className="bg-white/80 backdrop-blur-sm border border-gray-100 overflow-hidden">
              {/* Role Selection Tabs */}
              <div className="flex border-b border-gray-100">
                <motion.button
                  whileHover={{ scale: role !== "candidate" ? 1.02 : 1 }}
                  onClick={() => setRole("candidate")}
                  className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                    role === "candidate"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <IconUsers size={18} className="inline mr-2" />
                  Job Seeker
                </motion.button>
                <motion.button
                  whileHover={{ scale: role !== "recruiter" ? 1.02 : 1 }}
                  onClick={() => setRole("recruiter")}
                  className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                    role === "recruiter"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <IconBuilding size={18} className="inline mr-2" />
                  Recruiter
                </motion.button>
              </div>

              <div className="p-6 md:p-8">
                {/* Error Alert */}
                {error && (
                  <Alert color="red" variant="light" className="mb-4" withCloseButton onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                  <Stack gap="lg">
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Text fw={600} size="sm" className="text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </Text>
                      <TextInput
                        size="lg"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        leftSection={<IconUser size={18} className="text-gray-400" />}
                        disabled={loading}
                        radius="lg"
                      />
                      <Text size="xs" className="text-gray-400 mt-1">
                        This will be displayed on your profile
                      </Text>
                    </motion.div>

                    {/* Email ID */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Text fw={600} size="sm" className="text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </Text>
                      <TextInput
                        size="lg"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        leftSection={<IconMail size={18} className="text-gray-400" />}
                        disabled={loading}
                        radius="lg"
                        autoComplete="email"
                      />
                      <Text size="xs" className="text-gray-400 mt-1">
                        We'll send relevant jobs and updates to this email
                      </Text>
                    </motion.div>

                    {/* Password */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Text fw={600} size="sm" className="text-gray-700 mb-2">
                        Password <span className="text-red-500">*</span>
                      </Text>
                      <PasswordInput
                        size="lg"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        leftSection={<IconPassword size={18} className="text-gray-400" />}
                        disabled={loading}
                        radius="lg"
                        autoComplete="new-password"
                      />
                      <Text size="xs" className="text-gray-400 mt-1">
                        Minimum 6 characters with numbers & letters
                      </Text>
                      {password && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <Text size="xs" className="text-gray-500">Password strength:</Text>
                            <Text size="xs" c={passwordColor} fw={500}>{passwordLabel}</Text>
                          </div>
                          <Progress value={passwordPercent} color={passwordColor} size="xs" radius="xl" />
                        </div>
                      )}
                    </motion.div>

                    {/* Mobile Number */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <Text fw={600} size="sm" className="text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </Text>
                      <TextInput
                        size="lg"
                        placeholder="9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        leftSection={<IconPhone size={18} className="text-gray-400" />}
                        disabled={loading}
                        radius="lg"
                        maxLength={10}
                      />
                      <Text size="xs" className="text-gray-400 mt-1">
                        Recruiters will contact you on this number
                      </Text>
                    </motion.div>

                    {/* Terms and Conditions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          disabled={loading}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5"
                        />
                        <span className="text-sm text-gray-600">
                          I accept the{" "}
                          <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
                          {" "}and{" "}
                          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        fullWidth
                        size="lg"
                        radius="xl"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </motion.div>

                    {/* Divider */}
                    <Divider label="Or continue with" labelPosition="center" />

                    {/* Social Login */}
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        fullWidth 
                        size="md" 
                        radius="xl" 
                        leftSection={<IconBrandGoogle size={18} />}
                        disabled={loading}
                      >
                        Google
                      </Button>
                      <Button 
                        variant="outline" 
                        fullWidth 
                        size="md" 
                        radius="xl" 
                        leftSection={<IconBrandGithub size={18} />}
                        disabled={loading}
                      >
                        GitHub
                      </Button>
                    </div>

                    {/* Sign In Link (Mobile) */}
                    <div className="text-center lg:hidden mt-4">
                      <Text size="sm" className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                          Sign In
                        </Link>
                      </Text>
                    </div>
                  </Stack>
                </form>
              </div>
            </Paper>

            {/* Demo Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <IconShield size={14} className="text-blue-600" />
                <Text size="xs" fw={600} className="text-gray-700">Why Join JobPortal?</Text>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <IconCheck size={12} className="text-green-600" />
                  <span className="text-gray-600">Access to 10,000+ verified jobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={12} className="text-green-600" />
                  <span className="text-gray-600">AI-powered job recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={12} className="text-green-600" />
                  <span className="text-gray-600">Direct communication with recruiters</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;