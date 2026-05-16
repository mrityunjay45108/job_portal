// src/components/PostedJob/PostedJobDesc.tsx
import { Badge, Tabs, ScrollArea, Button, Modal, TextInput, Textarea, Select, Loader, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect, useCallback } from "react";
import { IconEdit, IconTrash, IconSend, IconBriefcase, IconMapPin, IconCoin, IconClock, IconBuilding, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import api from "../services/api";

const PostedJobDesc = ({ jobId, onJobUpdate, onJobDelete }: any) => {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    salary: '',
    experience: '',
    description: '',
    requirements: '',
    department: '',
    openings: 1,
    company: ''
  });

  const loadJobDetails = useCallback(async () => {
    if (!jobId) return;
    
    setLoading(true);
    try {
      const response = await api.get(`/jobs/${jobId}`);
      if (response.data.success) {
        const jobData = response.data.job;
        setJob(jobData);
        setFormData({
          jobTitle: jobData.jobTitle || '',
          location: jobData.location || '',
          jobType: jobData.jobType || 'Full-time',
          salary: jobData.salary || '',
          experience: jobData.experience || '1-3 years',
          description: jobData.description || '',
          requirements: (jobData.skills || []).join(', '),
          department: jobData.department || '',
          openings: jobData.openings || 1,
          company: jobData.companyName || ''
        });
      }
    } catch (error) {
      console.error("Error loading job:", error);
      notifications.show({ title: 'Error', message: 'Failed to load job details', color: 'red' });
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      loadJobDetails();
    }
  }, [jobId, loadJobDetails]);

  const handleUpdateJob = async () => {
    setSubmitting(true);
    try {
      const jobData = {
        jobTitle: formData.jobTitle,
        companyName: formData.company,
        location: formData.location,
        jobType: formData.jobType,
        salary: formData.salary,
        experience: formData.experience,
        description: formData.description,
        skills: formData.requirements ? formData.requirements.split(',').map(req => req.trim()) : [],
        department: formData.department,
        openings: formData.openings,
        status: 'active'
      };
      
      const response = await api.put(`/jobs/${jobId}`, jobData);
      if (response.data.success) {
        notifications.show({ 
          title: 'Success', 
          message: 'Job updated successfully', 
          color: 'green', 
          icon: <IconCheck size={16} /> 
        });
        close();
        if (onJobUpdate) onJobUpdate();
        loadJobDetails();
      }
    } catch (error: any) {
      notifications.show({ 
        title: 'Error', 
        message: error.response?.data?.message || 'Failed to update job', 
        color: 'red' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async () => {
    try {
      await api.delete(`/jobs/${jobId}`);
      notifications.show({ title: 'Deleted', message: 'Job has been removed', color: 'orange' });
      if (onJobDelete) onJobDelete();
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to delete job', color: 'red' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <div className="text-center">
          <div className="text-6xl mb-3">🔍</div>
          <p className="text-gray-500 font-medium">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        {/* Header with Actions */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h1>
              <Badge 
                variant="filled" 
                color={job.status === 'active' ? 'green' : 'orange'} 
                size="md" 
                className={`${job.status === 'active' ? 'bg-green-500' : 'bg-orange-500'} text-white uppercase font-semibold px-3`}
              >
                {job.status === 'active' ? 'ACTIVE' : 'DRAFT'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IconMapPin size={18} className="text-gray-500" />
              <span className="font-medium">{job.location}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={open}
              leftSection={<IconEdit size={16} />}
              variant="light"
              color="blue"
              className="hover:bg-blue-50"
            >
              Edit Job
            </Button>
            <Button
              onClick={handleDeleteJob}
              leftSection={<IconTrash size={16} />}
              variant="light"
              color="red"
              className="hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Job Details Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <IconBriefcase size={18} className="text-blue-600" />
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Job Type</div>
            </div>
            <div className="text-base font-bold text-gray-800">{job.jobType || 'Not specified'}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <IconBuilding size={18} className="text-purple-600" />
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Experience</div>
            </div>
            <div className="text-base font-bold text-gray-800">{job.experience || 'Not specified'}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <IconCoin size={18} className="text-green-600" />
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">Salary Range</div>
            </div>
            <div className="text-base font-bold text-green-700">{job.salary || 'Negotiable'}</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <IconClock size={18} className="text-orange-600" />
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Posted</div>
            </div>
            <div className="text-base font-bold text-gray-800">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Just now'}</div>
          </div>
        </div>

        {/* Tabs for Job Description */}
        <Tabs variant="outline" radius="md" defaultValue="overview">
          <Tabs.List className="mb-6 font-semibold text-base border-b border-gray-200">
            <Tabs.Tab value="overview" className="data-[active]:text-blue-600 data-[active]:border-blue-600 text-gray-700 font-medium">📋 Overview</Tabs.Tab>
            <Tabs.Tab value="applicants" className="data-[active]:text-blue-600 data-[active]:border-blue-600 text-gray-700 font-medium">👥 Applicants</Tabs.Tab>
            <Tabs.Tab value="invited" className="data-[active]:text-blue-600 data-[active]:border-blue-600 text-gray-700 font-medium">✉️ Invited</Tabs.Tab>
          </Tabs.List>

          <ScrollArea h={'calc(100vh - 420px)'} scrollbarSize={6} type="hover" offsetScrollbars>
            <Tabs.Panel value="overview" className="pt-2 pb-10">
              <div className="space-y-6">
                {job.description ? (
                  <>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-blue-600">📝</span> Job Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{job.description}</p>
                    </div>
                    
                    {job.skills && job.skills.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="text-blue-600">✓</span> Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill: string, idx: number) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-5xl mb-3">📝</div>
                    <p className="text-gray-500">No description added yet</p>
                    <Button onClick={open} variant="light" color="blue" size="sm" className="mt-3">Add Description</Button>
                  </div>
                )}
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="applicants" className="pt-2 pb-10">
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-6xl mb-4">👥</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">No applicants yet</div>
                <p className="text-gray-500 text-sm">Share this job to start receiving applications</p>
                <Button variant="filled" color="blue" leftSection={<IconSend size={16} />} className="mt-6 bg-blue-600 hover:bg-blue-700">Share Job</Button>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="invited" className="pt-2 pb-10">
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-6xl mb-4">📧</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">No invited candidates</div>
                <p className="text-gray-500 text-sm">Invite candidates to apply for this position</p>
                <Button variant="light" color="blue" className="mt-6">Invite Candidates</Button>
              </div>
            </Tabs.Panel>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Edit Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={<span className="text-2xl font-bold text-gray-800">✏️ Edit Job</span>}
        size="lg"
        radius="lg"
        className="bg-white"
        overlayProps={{ blur: 3, backgroundOpacity: 0.5 }}
      >
        <div className="space-y-5">
          {/* Job Title and Company */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Job Title"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              required
              size="md"
            />
            <TextInput
              label="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              size="md"
            />
          </div>
          
          {/* Location */}
          <TextInput
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            size="md"
          />

          {/* Job Type and Experience */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Job Type"
              data={['Full-time', 'Part-time', 'Contract', 'Internship']}
              value={formData.jobType}
              onChange={(value) => setFormData({ ...formData, jobType: value || 'Full-time' })}
              size="md"
            />
            <Select
              label="Experience Level"
              data={['0-1 years', '1-3 years', '3-5 years', '5-7 years', '7+ years']}
              value={formData.experience}
              onChange={(value) => setFormData({ ...formData, experience: value || '1-3 years' })}
              size="md"
            />
          </div>

          {/* Salary and Openings */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Salary Range"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              size="md"
              placeholder="e.g., $80k - $100k"
            />
            <NumberInput
              label="Openings"
              min={1}
              max={50}
              value={formData.openings}
              onChange={(value) => setFormData({ ...formData, openings: typeof value === 'number' ? value : 1 })}
              size="md"
            />
          </div>

          {/* Job Description */}
          <Textarea
            label="Job Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            minRows={4}
            size="md"
            placeholder="Describe the role, responsibilities, and benefits..."
          />

          {/* Skills/Requirements */}
          <Textarea
            label="Skills/Requirements (comma-separated)"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            minRows={2}
            size="md"
            placeholder="e.g., React, TypeScript, Node.js"
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleUpdateJob}
              loading={submitting}
              size="md"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              💾 Save Changes
            </Button>
            <Button
              onClick={close}
              variant="light"
              color="gray"
              size="md"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostedJobDesc;