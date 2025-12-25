import { Button, Divider, FileInput, Group, Select, Textarea, TextInput } from "@mantine/core";
import { IconBrandGithub, IconCheck, IconEdit, IconLink, IconPaperclip, IconSend } from "@tabler/icons-react";
import { useState, useRef } from "react";

const ApplyJobComp = () => {
  const [preview, setPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form data ko track karne ke liye state (Validation ke liye)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    year: '',
    session: '',
    branch: '',
    skills: '',
    projectName: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePreview = () => {
    // Basic Validation Logic
    const { fullName, email, college, year, session, branch, skills, projectName } = formData;
    if (!fullName || !email || !college || !year || !session || !branch || !skills || !projectName) {
      alert("Please fill all mandatory fields before submitting!");
      return;
    }
    setPreview(true);
  };

  const handleEdit = () => setPreview(false);
  
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-mine-shaft-950 pt-10 pb-20 px-4">
      <div className="w-full max-w-4xl">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img className="h-14" src="/Icons/Google.png" alt="Google" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-2xl text-white">Software Engineer III</div>
              <div className="text-lg text-mine-shaft-300">
                Google &bull; 3 days ago &bull; 48 Applicants
              </div>
            </div>
          </div>
        </div>

        <Divider my="xl" color="mineShaft.7" />

        <div className="text-xl font-semibold mb-6 text-white">
          {submitted ? "Application Status" : preview ? "Preview Your Application" : "Submit Your Application"}
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-10 [&>*]:flex-1">
            <TextInput 
              label="Full Name" withAsterisk placeholder="Enter name" 
              disabled={preview} required
              value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
            <TextInput 
              label="Email" withAsterisk placeholder="Enter email" 
              disabled={preview} required
              value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-10 [&>*]:flex-1">
            <TextInput 
              label="College Name" withAsterisk placeholder="Enter your college" 
              disabled={preview} required
              value={formData.college} onChange={(e) => handleInputChange('college', e.target.value)}
            />
            <Select 
              label="B.Tech Year" withAsterisk placeholder="Select year" 
              disabled={preview} required
              data={['1st Year', '2nd Year', '3rd Year', '4th Year']} 
              value={formData.year} onChange={(value) => handleInputChange('year', value)}
            />
          </div>

          {/* Row 3 */}
          <div className="flex flex-col sm:flex-row gap-10 [&>*]:flex-1">
            <TextInput 
              label="Session" withAsterisk placeholder="2021-2025" 
              disabled={preview} required
              value={formData.session} onChange={(e) => handleInputChange('session', e.target.value)}
            />
            <TextInput 
              label="Branch" withAsterisk placeholder="e.g. Computer Science" 
              disabled={preview} required
              value={formData.branch} onChange={(e) => handleInputChange('branch', e.target.value)}
            />
          </div>

          {/* Row 4 */}
          <div className="flex flex-col sm:flex-row gap-10 [&>*]:flex-1">
            <TextInput 
              label="Skills" withAsterisk placeholder="React, Node.js, etc." 
              disabled={preview} required
              value={formData.skills} onChange={(e) => handleInputChange('skills', e.target.value)}
            />
            <TextInput 
              label="GitHub Link" placeholder="Repository URL" 
              disabled={preview}
              leftSection={<IconBrandGithub size={18} />} 
            />
          </div>

          {/* Row 5 */}
          <div className="flex flex-col sm:flex-row gap-10 [&>*]:flex-1">
            <TextInput 
              label="Project Name" withAsterisk placeholder="Main Project" 
              disabled={preview} required
              value={formData.projectName} onChange={(e) => handleInputChange('projectName', e.target.value)}
            />
            <TextInput 
              label="Project Link" placeholder="Live URL" 
              disabled={preview}
              leftSection={<IconLink size={18} />} 
            />
          </div>

          <Textarea label="Project Description" placeholder="Briefly tell about your work..." disabled={preview} minRows={3} />

          <FileInput 
            label="Upload Resume" withAsterisk placeholder="Attach PDF" 
            disabled={preview} required
            leftSection={<IconPaperclip size={18} />} 
            accept="application/pdf"
          />

          {/* Button Section */}
          <Group grow mt="md">
            {!submitted && (
              <>
                {preview ? (
                  <>
                    <Button variant="outline" color="brightSun.4" size="lg" leftSection={<IconEdit size={20} />} onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button color="brightSun.4" size="lg" leftSection={<IconCheck size={20} />} onClick={handleSubmit}>
                      Confirm Submit
                    </Button>
                  </>
                ) : (
                  <Button color="brightSun.4" variant="light" size="lg" leftSection={<IconSend size={20} />} onClick={handlePreview}>
                    Submit Application
                  </Button>
                )}
              </>
            )}

            {submitted && (
              <Button color="green" size="lg" fullWidth leftSection={<IconCheck size={24} />}>
                Application Submitted Successfully!
              </Button>
            )}
          </Group>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobComp;