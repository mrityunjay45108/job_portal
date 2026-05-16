// import React, { useState } from "react";

// import {
//   Button,
//   Paper,
//   TextInput,
//   Select,
//   Radio,
//   Group,
//   Text,
//   Grid,
//   Checkbox,
//   Loader,
//   Skeleton,
//   Modal,
// } from "@mantine/core";

// import {
//   IconUser,
//   IconMail,
//   IconPhone,
//   IconMapPin,
//   IconSchool,
//   IconShieldCheck,
//   IconBriefcase,
//   IconSend,
//   IconBell,
//   IconBolt,
//   IconRobot,
//   IconHeadset,
//   IconCheck,
//   IconX,
// } from "@tabler/icons-react";

// const RecruitmentForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile_number: "",
//     whatsapp_number: "",
//     state: "",
//     qualification: "",
//     candidate: "",
//     recruiter: "",
//   });

//   // API endpoint - This doesn't expose the webhook URL
//   const API_ENDPOINT = "/api/submit-application";

//   // Simulate page loading
//   React.useEffect(() => {
//     setTimeout(() => {
//       setIsPageLoading(false);
//     }, 1000);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setLoading(true);
//     setSuccess(false);
//     setErrorMessage("");

//     // Basic validation
//     if (!formData.name || !formData.email || !formData.mobile_number) {
//       setErrorMessage("Please fill all required fields");
//       setShowErrorModal(true);
//       setLoading(false);
//       return;
//     }

//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       mobile_number: formData.mobile_number,
//       whatsapp_number: formData.whatsapp_number,
//       state: formData.state,
//       qualification: formData.qualification,
//       candidate: formData.candidate,
//       recruiter: formData.recruiter,
//       submitted_at: new Date().toISOString(),
//       source: "Recruitment Form",
//     };

//     console.log(" Sending data to backend:", payload);

//     try {
//       // Call backend API instead of directly calling Zapier
//       const response = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         console.log("Application submitted successfully!");
//         setSuccess(true);
//         setShowSuccessModal(true);

//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           mobile_number: "",
//           whatsapp_number: "",
//           state: "",
//           qualification: "",
//           candidate: "",
//           recruiter: "",
//         });

//         setTimeout(() => {
//           setSuccess(false);
//           setShowSuccessModal(false);
//         }, 3000);
//       } else {
//         throw new Error(data.error || "Submission failed");
//       }

//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("Unable to submit. Please try again.");
//       setShowErrorModal(true);

//       setTimeout(() => {
//         setShowErrorModal(false);
//       }, 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Skeleton Loader Component
//   const FormSkeleton = () => (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
//         <div className="flex items-center gap-4">
//           <Skeleton height={64} width={64} radius="xl" />
//           <div>
//             <Skeleton height={36} width={300} radius="md" />
//             <Skeleton height={20} width={250} radius="md" mt={8} />
//           </div>
//         </div>
//         <Skeleton height={56} width={280} radius="xl" />
//       </div>

//       <Grid gutter="xl">
//         {[1, 2, 3, 4, 5, 6].map((item) => (
//           <Grid.Col key={item} span={{ base: 12, md: 6 }}>
//             <Skeleton height={20} width={100} radius="md" mb={8} />
//             <Skeleton height={56} width="100%" radius="xl" />
//           </Grid.Col>
//         ))}

//         <Grid.Col span={12}>
//           <Skeleton height={20} width={250} radius="md" mb={10} />
//           <div className="flex gap-4">
//             <Skeleton height={20} width={60} radius="xl" />
//             <Skeleton height={20} width={60} radius="xl" />
//           </div>
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <Skeleton height={20} width={250} radius="md" mb={10} />
//           <div className="flex gap-4">
//             <Skeleton height={20} width={60} radius="xl" />
//             <Skeleton height={20} width={60} radius="xl" />
//           </div>
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <Skeleton height={20} width={400} radius="md" />
//         </Grid.Col>

//         <Grid.Col span={12}>
//           <div className="flex justify-center mt-8">
//             <Skeleton height={64} width={250} radius="xl" />
//           </div>
//         </Grid.Col>
//       </Grid>
//     </div>
//   );

//   const HeroSkeleton = () => (
//     <div className="mb-8">
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
//         <div className="px-6 py-8 md:px-10 md:py-8">
//           <Skeleton height={28} width={200} radius="xl" mb={16} />
//           <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
//             <div>
//               <Skeleton height={48} width={400} radius="md" mb={12} />
//               <Skeleton height={20} width={500} radius="md" />
//               <Skeleton height={20} width={450} radius="md" mt={4} />
//             </div>
//             <div className="flex gap-3">
//               <Skeleton height={60} width={70} radius="lg" />
//               <Skeleton height={60} width={70} radius="lg" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/20">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="flex items-center gap-2">
//                 <Skeleton height={28} width={28} radius="md" />
//                 <div>
//                   <Skeleton height={14} width={100} radius="md" />
//                   <Skeleton height={10} width={80} radius="md" mt={4} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (isPageLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
//         <div className="max-w-6xl mx-auto">
//           <HeroSkeleton />
//           <Paper radius={40} p="xl" className="border border-gray-200 shadow-2xl bg-white">
//             <FormSkeleton />
//           </Paper>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
//       <div className="max-w-6xl mx-auto">

//         {/* SUCCESS MODAL POPUP */}
//         <Modal
//           opened={showSuccessModal}
//           onClose={() => setShowSuccessModal(false)}
//           withCloseButton={false}
//           centered
//           radius="xl"
//           padding="xl"
//           size="sm"
//         >
//           <div className="text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <IconCheck size={40} className="text-green-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">✓ Registration Successful!</h3>
//             <p className="text-gray-600 mb-4">
//               Your application has been submitted successfully. We'll notify you about future opportunities.
//             </p>
//             <Button
//               onClick={() => setShowSuccessModal(false)}
//               className="bg-gradient-to-r from-green-500 to-green-600 text-white"
//               fullWidth
//               radius="xl"
//             >
//               Close
//             </Button>
//           </div>
//         </Modal>

//         {/* ERROR MODAL POPUP */}
//         <Modal
//           opened={showErrorModal}
//           onClose={() => setShowErrorModal(false)}
//           withCloseButton={false}
//           centered
//           radius="xl"
//           padding="xl"
//           size="sm"
//         >
//           <div className="text-center">
//             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <IconX size={40} className="text-red-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">✗ Submission Failed!</h3>
//             <p className="text-gray-600 mb-4">
//               {errorMessage || "Unable to submit your application. Please try again."}
//             </p>
//             <Button
//               onClick={() => setShowErrorModal(false)}
//               className="bg-gradient-to-r from-red-500 to-red-600 text-white"
//               fullWidth
//               radius="xl"
//             >
//               Try Again
//             </Button>
//           </div>
//         </Modal>

//         {/* COMPACT HERO SECTION */}
//         <div className="mb-8">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
//             <div className="px-6 py-8 md:px-10 md:py-8">

//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
//                 <IconBriefcase size={14} className="text-yellow-300" />
//                 <span className="text-white font-bold text-xs uppercase tracking-wider">
//                   Future Career Opportunities
//                 </span>
//               </div>

//               <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
//                     Register Today.{" "}
//                     <span className="text-yellow-300">Get Future Opportunities.</span>
//                   </h1>
//                   <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl">
//                     Join our talent network and stay updated with upcoming internships,
//                     fresher roles, startup opportunities, and professional career openings.
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[70px]">
//                     <div className="text-white font-bold text-lg">10K+</div>
//                     <div className="text-white/70 text-[10px]">Jobs</div>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[70px]">
//                     <div className="text-white font-bold text-lg">500+</div>
//                     <div className="text-white/70 text-[10px]">Companies</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/20">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
//                     <IconBell size={14} className="text-white" />
//                   </div>
//                   <div>
//                     <div className="text-white font-semibold text-xs">Future Job Alerts</div>
//                     <div className="text-white/60 text-[10px]">Instant notifications</div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
//                     <IconBolt size={14} className="text-white" />
//                   </div>
//                   <div>
//                     <div className="text-white font-semibold text-xs">Easy Registration</div>
//                     <div className="text-white/60 text-[10px]">One minute apply</div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
//                     <IconRobot size={14} className="text-white" />
//                   </div>
//                   <div>
//                     <div className="text-white font-semibold text-xs">AI Resume Support</div>
//                     <div className="text-white/60 text-[10px]">Better visibility</div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
//                     <IconHeadset size={14} className="text-white" />
//                   </div>
//                   <div>
//                     <div className="text-white font-semibold text-xs">Career Guidance</div>
//                     <div className="text-white/60 text-[10px]">Interview support</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FORM SECTION */}
//         <div className="max-w-6xl mx-auto">
//           <Paper radius={40} p="xl" className="border border-gray-200 shadow-2xl bg-white">

//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
//                   <IconBriefcase size={34} />
//                 </div>
//                 <div>
//                   <h2 className="text-4xl font-black text-gray-900">
//                     Candidate Registration Form
//                   </h2>
//                   <p className="text-gray-500 mt-1">
//                     Register your details for future opportunities
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 px-5 py-3 rounded-2xl">
//                 <IconShieldCheck size={24} className="text-blue-600" />
//                 <Text size="sm" fw={600} c="blue">
//                   Your information is secure & confidential
//                 </Text>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <Grid gutter="xl">
//                 <Grid.Col span={{ base: 12, md: 6 }}>
//                   <TextInput
//                     label="Full Name *"
//                     placeholder="Enter your full name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     size="lg"
//                     radius="xl"
//                     leftSection={<IconUser size={18} />}
//                   />
//                 </Grid.Col>

//                 <Grid.Col span={{ base: 12, md: 6 }}>
//                   <TextInput
//                     label="Email Address *"
//                     placeholder="Enter your email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     size="lg"
//                     radius="xl"
//                     leftSection={<IconMail size={18} />}
//                   />
//                 </Grid.Col>

//                 <Grid.Col span={{ base: 12, md: 6 }}>
//                   <TextInput
//                     label="Mobile Number *"
//                     placeholder="Enter mobile number"
//                     name="mobile_number"
//                     value={formData.mobile_number}
//                     onChange={handleChange}
//                     required
//                     size="lg"
//                     radius="xl"
//                     leftSection={<IconPhone size={18} />}
//                   />
//                 </Grid.Col>

//                 <Grid.Col span={{ base: 12, md: 6 }}>
//                   <TextInput
//                     label="WhatsApp Number"
//                     placeholder="Enter WhatsApp number"
//                     name="whatsapp_number"
//                     value={formData.whatsapp_number}
//                     onChange={handleChange}
//                     size="lg"
//                     radius="xl"
//                     leftSection={<IconPhone size={18} />}
//                   />
//                 </Grid.Col>

//                 <Grid.Col span={{ base: 12, md: 6 }}>
//                   <Select
//                     label="State"
//                     placeholder="Select your state"
//                     value={formData.state}
//                     onChange={(value) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         state: value || "",
//                       }))
//                     }
//                     size="lg"
//                     radius="xl"
//                     leftSection={<IconMapPin size={18} />}
//                     data={[
//                       "Bihar", "Delhi", "Maharashtra", "Karnataka",
//                       "Uttar Pradesh", "West Bengal", "Tamil Nadu",
//                       "Gujarat", "Rajasthan", "Other",
//                     ]}
//                   />
//                 </Grid.Col>

//                 <Grid.Col span={{ base: 12, md: 6 }}>
//                   <Select
//                     label="Qualification"
//                     placeholder="Select qualification"
//                     value={formData.qualification}
//                     onChange={(value) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         qualification: value || "",
//                       }))
//                     }
//                     size="lg"
//                     radius="xl"
//                     leftSection={<IconSchool size={18} />}
//                     data={[
//                       "B.Tech", "M.Tech", "BCA", "MCA", "MBA",
//                       "B.Sc", "M.Sc", "B.Com", "M.Com", "Other",
//                     ]}
//                   />
//                 </Grid.Col>

//                 <Grid.Col span={12}>
//                   <Text fw={700} size="sm" mb={10}>
//                     Are you currently looking for opportunities? *
//                   </Text>
//                   <Radio.Group
//                     value={formData.candidate}
//                     onChange={(value) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         candidate: value,
//                       }))
//                     }
//                   >
//                     <Group>
//                       <Radio value="yes" label="Yes" />
//                       <Radio value="no" label="No" />
//                     </Group>
//                   </Radio.Group>
//                 </Grid.Col>

//                 <Grid.Col span={12}>
//                   <Text fw={700} size="sm" mb={10}>
//                     Are you a recruiter or hiring manager? *
//                   </Text>
//                   <Radio.Group
//                     value={formData.recruiter}
//                     onChange={(value) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         recruiter: value,
//                       }))
//                     }
//                   >
//                     <Group>
//                       <Radio value="yes" label="Yes" />
//                       <Radio value="no" label="No" />
//                     </Group>
//                   </Radio.Group>
//                 </Grid.Col>

//                 <Grid.Col span={12}>
//                   <Checkbox
//                     required
//                     label="I agree to receive updates regarding future job opportunities."
//                   />
//                 </Grid.Col>

//                 <Grid.Col span={12}>
//                   <div className="flex justify-center mt-8">
//                     <Button
//                       type="submit"
//                       disabled={loading}
//                       size="xl"
//                       radius="xl"
//                       rightSection={
//                         loading ? (
//                           <Loader size={18} color="white" />
//                         ) : (
//                           <IconSend size={20} />
//                         )
//                       }
//                       className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-16 h-16 text-lg font-bold shadow-xl"
//                     >
//                       {loading ? "Submitting..." : "Register Now"}
//                     </Button>
//                   </div>
//                 </Grid.Col>
//               </Grid>
//             </form>
//           </Paper>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruitmentForm;

import React, { useState } from "react";

import {
  Button,
  Paper,
  TextInput,
  Select,
  Radio,
  Group,
  Text,
  Grid,
  Checkbox,
  Loader,
  Skeleton,
  Modal,
} from "@mantine/core";

import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconSchool,
  IconShieldCheck,
  IconBriefcase,
  IconSend,
  IconBell,
  IconBolt,
  IconRobot,
  IconHeadset,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

const RecruitmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    whatsapp_number: "",
    state: "",
    qualification: "",
    candidate: "",
    recruiter: "",
  });

  // API endpoint
  const API_ENDPOINT = "/api/submit-application";

  // Simulate page loading
  React.useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.mobile_number) {
      setErrorMessage("Please fill all required fields");
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile_number)) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      mobile_number: formData.mobile_number,
      whatsapp_number: formData.whatsapp_number,
      state: formData.state,
      qualification: formData.qualification,
      candidate: formData.candidate,
      recruiter: formData.recruiter,
      submitted_at: new Date().toISOString(),
      source: "Recruitment Form",
    };

    console.log("📤 Sending data to backend:", payload);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        const text = await response.text();
        console.error("❌ Response error:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log("✅ Application submitted successfully!");
        setSuccess(true);
        setShowSuccessModal(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile_number: "",
          whatsapp_number: "",
          state: "",
          qualification: "",
          candidate: "",
          recruiter: "",
        });

        setTimeout(() => {
          setSuccess(false);
          setShowSuccessModal(false);
        }, 3000);
      } else {
        throw new Error(data.error || "Submission failed");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit. Please try again.",
      );
      setShowErrorModal(true);

      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // Skeleton Loader Component
  const FormSkeleton = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div className="flex items-center gap-4">
          <Skeleton height={64} width={64} radius="xl" />
          <div>
            <Skeleton height={36} width={300} radius="md" />
            <Skeleton height={20} width={250} radius="md" mt={8} />
          </div>
        </div>
        <Skeleton height={56} width={280} radius="xl" />
      </div>

      <Grid gutter="xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid.Col key={item} span={{ base: 12, md: 6 }}>
            <Skeleton height={20} width={100} radius="md" mb={8} />
            <Skeleton height={56} width="100%" radius="xl" />
          </Grid.Col>
        ))}

        <Grid.Col span={12}>
          <Skeleton height={20} width={250} radius="md" mb={10} />
          <div className="flex gap-4">
            <Skeleton height={20} width={60} radius="xl" />
            <Skeleton height={20} width={60} radius="xl" />
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <Skeleton height={20} width={250} radius="md" mb={10} />
          <div className="flex gap-4">
            <Skeleton height={20} width={60} radius="xl" />
            <Skeleton height={20} width={60} radius="xl" />
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <Skeleton height={20} width={400} radius="md" />
        </Grid.Col>

        <Grid.Col span={12}>
          <div className="flex justify-center mt-8">
            <Skeleton height={64} width={250} radius="xl" />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );

  const HeroSkeleton = () => (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-8 md:px-10 md:py-8">
          <Skeleton height={28} width={200} radius="xl" mb={16} />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <Skeleton height={48} width={400} radius="md" mb={12} />
              <Skeleton height={20} width={500} radius="md" />
              <Skeleton height={20} width={450} radius="md" mt={4} />
            </div>
            <div className="flex gap-3">
              <Skeleton height={60} width={70} radius="lg" />
              <Skeleton height={60} width={70} radius="lg" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/20">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Skeleton height={28} width={28} radius="md" />
                <div>
                  <Skeleton height={14} width={100} radius="md" />
                  <Skeleton height={10} width={80} radius="md" mt={4} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <HeroSkeleton />
          <Paper
            radius={40}
            p="xl"
            className="border border-gray-200 shadow-2xl bg-white"
          >
            <FormSkeleton />
          </Paper>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* SUCCESS MODAL POPUP */}
        <Modal
          opened={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          withCloseButton={false}
          centered
          radius="xl"
          padding="xl"
          size="sm"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconCheck size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ✓ Registration Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              Your application has been submitted successfully. We'll notify you
              about future opportunities.
            </p>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white"
              fullWidth
              radius="xl"
            >
              Close
            </Button>
          </div>
        </Modal>

        {/* ERROR MODAL POPUP */}
        <Modal
          opened={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          withCloseButton={false}
          centered
          radius="xl"
          padding="xl"
          size="sm"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconX size={40} className="text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ✗ Submission Failed!
            </h3>
            <p className="text-gray-600 mb-4">
              {errorMessage ||
                "Unable to submit your application. Please try again."}
            </p>
            <Button
              onClick={() => setShowErrorModal(false)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white"
              fullWidth
              radius="xl"
            >
              Try Again
            </Button>
          </div>
        </Modal>

        {/* COMPACT HERO SECTION */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 md:px-10 md:py-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                <IconBriefcase size={14} className="text-yellow-300" />
                <span className="text-white font-bold text-xs uppercase tracking-wider">
                  Future Career Opportunities
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    Register Today.{" "}
                    <span className="text-yellow-300">
                      Get Future Opportunities.
                    </span>
                  </h1>
                  <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl">
                    Join our talent network and stay updated with upcoming
                    internships, fresher roles, startup opportunities, and
                    professional career openings.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[70px]">
                    <div className="text-white font-bold text-lg">10K+</div>
                    <div className="text-white/70 text-[10px]">Jobs</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[70px]">
                    <div className="text-white font-bold text-lg">500+</div>
                    <div className="text-white/70 text-[10px]">Companies</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                    <IconBell size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-xs">
                      Future Job Alerts
                    </div>
                    <div className="text-white/60 text-[10px]">
                      Instant notifications
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                    <IconBolt size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-xs">
                      Easy Registration
                    </div>
                    <div className="text-white/60 text-[10px]">
                      One minute apply
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                    <IconRobot size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-xs">
                      AI Resume Support
                    </div>
                    <div className="text-white/60 text-[10px]">
                      Better visibility
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                    <IconHeadset size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-xs">
                      Career Guidance
                    </div>
                    <div className="text-white/60 text-[10px]">
                      Interview support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="max-w-6xl mx-auto">
          <Paper
            radius={40}
            p="xl"
            className="border border-gray-200 shadow-2xl bg-white"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <IconBriefcase size={34} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-gray-900">
                    Candidate Registration Form
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Register your details for future opportunities
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 px-5 py-3 rounded-2xl">
                <IconShieldCheck size={24} className="text-blue-600" />
                <Text size="sm" fw={600} c="blue">
                  Your information is secure & confidential
                </Text>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Full Name *"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    size="lg"
                    radius="xl"
                    leftSection={<IconUser size={18} />}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Email Address *"
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    size="lg"
                    radius="xl"
                    leftSection={<IconMail size={18} />}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Mobile Number *"
                    placeholder="Enter mobile number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    required
                    size="lg"
                    radius="xl"
                    leftSection={<IconPhone size={18} />}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="WhatsApp Number"
                    placeholder="Enter WhatsApp number"
                    name="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={handleChange}
                    size="lg"
                    radius="xl"
                    leftSection={<IconPhone size={18} />}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="State"
                    placeholder="Select your state"
                    value={formData.state}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        state: value || "",
                      }))
                    }
                    size="lg"
                    radius="xl"
                    leftSection={<IconMapPin size={18} />}
                    data={[
                      "Bihar",
                      "Delhi",
                      "Maharashtra",
                      "Karnataka",
                      "Uttar Pradesh",
                      "West Bengal",
                      "Tamil Nadu",
                      "Gujarat",
                      "Rajasthan",
                      "Other",
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Qualification"
                    placeholder="Select qualification"
                    value={formData.qualification}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        qualification: value || "",
                      }))
                    }
                    size="lg"
                    radius="xl"
                    leftSection={<IconSchool size={18} />}
                    data={[
                      "B.Tech",
                      "M.Tech",
                      "BCA",
                      "MCA",
                      "MBA",
                      "B.Sc",
                      "M.Sc",
                      "B.Com",
                      "M.Com",
                      "Other",
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <Text fw={700} size="sm" mb={10}>
                    Are you currently looking for opportunities? *
                  </Text>
                  <Radio.Group
                    value={formData.candidate}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        candidate: value,
                      }))
                    }
                  >
                    <Group>
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </Group>
                  </Radio.Group>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Text fw={700} size="sm" mb={10}>
                    Are you a recruiter or hiring manager? *
                  </Text>
                  <Radio.Group
                    value={formData.recruiter}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        recruiter: value,
                      }))
                    }
                  >
                    <Group>
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </Group>
                  </Radio.Group>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Checkbox
                    required
                    label="I agree to receive updates regarding future job opportunities."
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <div className="flex justify-center mt-8">
                    <Button
                      type="submit"
                      disabled={loading}
                      size="xl"
                      radius="xl"
                      rightSection={
                        loading ? (
                          <Loader size={18} color="white" />
                        ) : (
                          <IconSend size={20} />
                        )
                      }
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-16 h-16 text-lg font-bold shadow-xl"
                    >
                      {loading ? "Submitting..." : "Register Now"}
                    </Button>
                  </div>
                </Grid.Col>
              </Grid>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentForm;
