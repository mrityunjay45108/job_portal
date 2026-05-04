import { useEffect, useState, useRef } from "react";
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
  Checkbox,
  Alert
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconBrandGoogle,
  IconBrandGithub,
  IconBriefcase,
  IconUser,
  IconArrowRight,
  IconEye,
  IconEyeOff,
  IconCircleCheck,
  IconRocket,
  IconShield,
  IconSparkles,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Add ref to prevent multiple submissions
  const isSubmitting = useRef(false);

  const handleLogin = async () => {
    // ✅ Prevent multiple simultaneous submissions
    if (loading || isSubmitting.current) {
      console.log("Login already in progress, skipping duplicate request");
      notifications.show({
        title: "Please Wait",
        message: "Login already in progress...",
        color: "yellow"
      });
      return;
    }
    
    // Clear previous error
    setError("");
    
    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      notifications.show({
        title: "Missing Information",
        message: "Please fill in all fields",
        color: "red"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      notifications.show({
        title: "Invalid Email",
        message: "Please enter a valid email address",
        color: "red"
      });
      return;
    }

    setLoading(true);
    isSubmitting.current = true;
    
    try {
      console.log("📝 Sending login request for:", email);
      const result = await login(email, password);
      
      console.log("Login result:", result);

      if (result.success) {
        notifications.show({
          title: "Welcome Back! 👋",
          message: `Successfully logged in as ${result.role === 'candidate' ? 'Candidate' : 'Recruiter'}`,
          color: "green",
          autoClose: 2000,
        });
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
        } else {
          localStorage.removeItem("rememberEmail");
        }
        
        // Redirect based on role
        setTimeout(() => {
          if (result.role === "candidate") {
            navigate("/candidate-dashboard");
          } else if (result.role === "recruiter") {
            navigate("/Recruiter-Dashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
        notifications.show({
          title: "Login Failed",
          message: result.message || "Invalid email or password",
          color: "red"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again.",
        color: "red"
      });
    } finally {
      setLoading(false);
      // Reset submitting flag after a delay to prevent rapid resubmission
      setTimeout(() => {
        isSubmitting.current = false;
      }, 1000);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Load saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const features = [
    { icon: <IconSparkles size={16} />, text: "AI-Powered Job Matching" },
    { icon: <IconRocket size={16} />, text: "Instant Apply" },
    { icon: <IconShield size={16} />, text: "Secure Platform" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Blobs */}
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
              <Text size="sm" className="text-gray-500">New to JobPortal?</Text>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="light" color="blue" size="sm" radius="xl" className="font-semibold">
                    Create Account →
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
                {/* ... rest of left side content remains the same ... */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                    Welcome Back!
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4"
                >
                  Sign in to your{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Account
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-500 mb-8 leading-relaxed"
                >
                  Access your dashboard, track applications, and discover new opportunities.
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
                    <div className="text-xs text-gray-500">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">5,000+</div>
                    <div className="text-xs text-gray-500">Companies</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <Paper shadow="2xl" radius="xl" className="bg-white/80 backdrop-blur-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
                    <IconUser size={24} className="text-white" />
                  </div>
                  <div>
                    <Title order={2} className="text-2xl font-bold text-gray-900">
                      Welcome Back!
                    </Title>
                    <Text size="sm" className="text-gray-500">
                      Sign in to continue your journey
                    </Text>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {error && (
                  <Alert color="red" variant="light" className="mb-4" withCloseButton onClose={() => setError("")}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  handleLogin(); 
                }}>
                  <Stack gap="lg">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Text fw={600} size="sm" className="text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </Text>
                      <TextInput
                        size="lg"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        leftSection={<IconAt size={18} className="text-gray-400" />}
                        radius="lg"
                        autoComplete="email"
                        disabled={loading}
                        styles={{
                          input: {
                            borderColor: focusedField === "email" ? "#3b82f6" : "#e5e7eb",
                            boxShadow: focusedField === "email" ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
                            transition: "all 0.2s"
                          }
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Text fw={600} size="sm" className="text-gray-700">
                          Password <span className="text-red-500">*</span>
                        </Text>
                        <Anchor href="/forgot-password" size="xs" className="text-blue-600 hover:text-blue-700">
                          Forgot password?
                        </Anchor>
                      </div>
                      <PasswordInput
                        size="lg"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        leftSection={<IconLock size={18} className="text-gray-400" />}
                        radius="lg"
                        autoComplete="current-password"
                        disabled={loading}
                        visibilityToggleIcon={({ reveal }) => 
                          reveal ? <IconEyeOff size={18} /> : <IconEye size={18} />
                        }
                        styles={{
                          input: {
                            borderColor: focusedField === "password" ? "#3b82f6" : "#e5e7eb",
                            boxShadow: focusedField === "password" ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
                            transition: "all 0.2s"
                          }
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between"
                    >
                      <Checkbox
                        label="Remember me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.currentTarget.checked)}
                        size="sm"
                        disabled={loading}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        fullWidth
                        size="lg"
                        radius="xl"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                        rightSection={!loading && <IconArrowRight size={18} />}
                      >
                        {loading ? "Signing In..." : "Sign In"}
                      </Button>
                    </motion.div>

                    <Divider label="Or continue with" labelPosition="center" />

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

                    <div className="text-center lg:hidden mt-4">
                      <Text size="sm" className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                          Create Account
                        </Link>
                      </Text>
                    </div>
                  </Stack>
                </form>
              </div>
            </Paper>

            {/* Demo Credentials Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <IconShield size={14} className="text-blue-600" />
                <Text size="xs" fw={600} className="text-gray-700">Demo Credentials</Text>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-2 bg-white/50 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-1"> Job Seeker</div>
                  <div className="text-gray-500">candidate@example.com</div>
                  <div className="text-gray-400 text-xs">Password: 123456</div>
                </div>
                <div className="text-center p-2 bg-white/50 rounded-lg">
                  <div className="font-semibold text-indigo-600 mb-1">👔 Recruiter</div>
                  <div className="text-gray-500">recruiter@example.com</div>
                  <div className="text-gray-400 text-xs">Password: 123456</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Login;