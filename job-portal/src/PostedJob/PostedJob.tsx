// src/components/PostedJob/PostedJob.tsx
import { ScrollArea, Tabs, Button, Modal, TextInput, Textarea, Select, ActionIcon, Menu, NumberInput, Loader, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { IconPlus, IconDotsVertical, IconEdit, IconTrash, IconCopy, IconArchive, IconEye, IconSend, IconCheck, IconAlertCircle } from "@tabler/icons-react";
import PostedJobCard from "./PostedJobCard";
import { notifications } from "@mantine/notifications";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Job {
  _id: string;
  jobTitle: string;
  location: string;
  posted: string;
  status: 'active' | 'draft';
  description?: string;
  requirements?: string[];
  salary?: string;
  jobType?: string;
  experience?: string;
  department?: string;
  openings?: number;
  company?: string;
  createdAt?: string;
}

const PostedJob = ({ onJobSelect, selectedJobId, refreshTrigger }: any) => {
  const [activeTab, setActiveTab] = useState<string | null>('active');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    jobType: 'Full-time',
    salary: '',
    experience: '1-3 years',
    description: '',
    requirements: '',
    department: '',
    openings: 1,
    company: ''
  });

  useEffect(() => {
    if (isAuthenticated && user?.role === 'recruiter') {
      loadJobs();
    }
  }, [refreshTrigger, isAuthenticated, user]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/jobs/recruiter/jobs');
      if (response.data.success) {
        const formattedJobs = response.data.jobs.map((job: any) => ({
          _id: job._id,
          jobTitle: job.jobTitle,
          location: job.location,
          posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Just now',
          status: job.status === 'active' ? 'active' : 'draft',
          jobType: job.jobType,
          salary: job.salary,
          experience: job.experience,
          description: job.description,
          department: job.department,
          openings: job.openings,
          company: job.companyName
        }));
        setJobs(formattedJobs);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      notifications.show({
        title: 'Error',
        message: 'Failed to load jobs',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveJobs = (updatedJobs: Job[]) => {
    setJobs(updatedJobs);
  };

  const handleCreateJob = async () => {
    if (!formData.jobTitle || !formData.location) {
      notifications.show({ title: 'Error', message: 'Please fill in job title and location', color: 'red' });
      return;
    }

    setSubmitting(true);

    try {
      const jobData = {
        jobTitle: formData.jobTitle,
        companyName: formData.company || user?.fullName || 'Company',
        location: formData.location,
        jobType: formData.jobType,
        salary: formData.salary,
        experience: formData.experience,
        description: formData.description,
        skills: formData.requirements ? formData.requirements.split(',').map(req => req.trim()) : [],
        department: formData.department,
        openings: formData.openings,
        status: 'active',
        urgentHiring: false
      };

      let response;
      if (editingJob) {
        response = await api.put(`/jobs/${editingJob._id}`, jobData);
        if (response.data.success) {
          notifications.show({ title: 'Success', message: 'Job updated successfully', color: 'green', icon: <IconCheck size={16} /> });
        }
      } else {
        response = await api.post('/jobs', jobData);
        if (response.data.success) {
          notifications.show({ title: 'Success', message: 'Job posted successfully', color: 'green', icon: <IconCheck size={16} /> });
        }
      }
      
      await loadJobs();
      close();
      resetForm();
      if (onJobSelect && response?.data.job?._id) onJobSelect(response.data.job._id);
    } catch (error: any) {
      console.error("Error saving job:", error);
      notifications.show({ 
        title: 'Error', 
        message: error.response?.data?.message || 'Failed to save job', 
        color: 'red' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async () => {
    if (jobToDelete) {
      try {
        await api.delete(`/jobs/${jobToDelete._id}`);
        await loadJobs();
        notifications.show({ title: 'Deleted', message: `"${jobToDelete.jobTitle}" has been removed`, color: 'orange' });
        if (selectedJobId === jobToDelete._id && onJobSelect) onJobSelect(null);
        setDeleteModalOpen(false);
        setJobToDelete(null);
      } catch (error) {
        notifications.show({ title: 'Error', message: 'Failed to delete job', color: 'red' });
      }
    }
  };

  const confirmDelete = (job: Job) => {
    setJobToDelete(job);
    setDeleteModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setFormData({
      jobTitle: job.jobTitle,
      location: job.location,
      jobType: job.jobType || 'Full-time',
      salary: job.salary || '',
      experience: job.experience || '1-3 years',
      description: job.description || '',
      requirements: job.requirements?.join(', ') || '',
      department: job.department || '',
      openings: job.openings || 1,
      company: job.company || ''
    });
    open();
  };

  const handleDuplicateJob = async (job: Job) => {
    try {
      const jobData = {
        jobTitle: `${job.jobTitle} (Copy)`,
        companyName: job.company || user?.fullName || 'Company',
        location: job.location,
        jobType: job.jobType,
        salary: job.salary,
        experience: job.experience,
        description: job.description,
        skills: job.requirements || [],
        department: job.department,
        openings: job.openings,
        status: 'draft',
        urgentHiring: false
      };
      
      await api.post('/jobs', jobData);
      await loadJobs();
      notifications.show({ title: 'Success', message: 'Job duplicated successfully', color: 'green' });
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to duplicate job', color: 'red' });
    }
  };

  const handleArchiveJob = async (jobId: string) => {
    try {
      await api.patch(`/jobs/${jobId}/status`, { status: 'draft' });
      await loadJobs();
      notifications.show({ title: 'Archived', message: 'Job moved to drafts', color: 'blue' });
      if (selectedJobId === jobId) onJobSelect?.(null);
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to archive job', color: 'red' });
    }
  };

  const handlePublishJob = async (jobId: string) => {
    try {
      await api.patch(`/jobs/${jobId}/status`, { status: 'active' });
      await loadJobs();
      notifications.show({ title: 'Published', message: 'Job is now live', color: 'green' });
      onJobSelect?.(jobId);
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to publish job', color: 'red' });
    }
  };

  const resetForm = () => {
    setEditingJob(null);
    setFormData({
      jobTitle: '',
      location: '',
      jobType: 'Full-time',
      salary: '',
      experience: '1-3 years',
      description: '',
      requirements: '',
      department: '',
      openings: 1,
      company: ''
    });
  };

  const activeJobs = jobs.filter(job => job.status === 'active');
  const draftJobs = jobs.filter(job => job.status === 'draft');

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-8">
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">My Jobs</h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage and track your job postings</p>
            </div>
            <Button onClick={() => { resetForm(); open(); }} leftSection={<IconPlus size={18} />} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white" size="sm" radius="md">
              Post New Job
            </Button>
          </div>
        </div>

        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-6">
            <div><span className="text-2xl font-bold text-gray-900">{activeJobs.length}</span><span className="text-sm text-gray-500 ml-1">Active</span></div>
            <div><span className="text-2xl font-bold text-gray-900">{draftJobs.length}</span><span className="text-sm text-gray-500 ml-1">Drafts</span></div>
            <div><span className="text-2xl font-bold text-gray-900">{jobs.length}</span><span className="text-sm text-gray-500 ml-1">Total</span></div>
          </div>
        </div>

        <Tabs color="blue" variant="pills" value={activeTab} onChange={setActiveTab}>
          <div className="px-5 pt-4">
            <Tabs.List className="gap-2">
              <Tabs.Tab value="active" className="data-[active]:bg-blue-600 data-[active]:text-white font-medium">Active Jobs ({activeJobs.length})</Tabs.Tab>
              <Tabs.Tab value="draft" className="data-[active]:bg-blue-600 data-[active]:text-white font-medium">Drafts ({draftJobs.length})</Tabs.Tab>
            </Tabs.List>
          </div>

          <ScrollArea h="calc(100vh - 320px)" scrollbarSize={4} offsetScrollbars>
            <div className="p-4 space-y-3">
              <Tabs.Panel value="active">
                {activeJobs.length === 0 ? (
                  <div className="text-center py-12"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"><IconPlus size={24} className="text-gray-400" /></div><p className="text-gray-500">No active jobs</p></div>
                ) : (
                  activeJobs.map((job) => (
                    <div key={job._id} className="group relative">
                      <div onClick={() => onJobSelect?.(job._id)} className={`cursor-pointer transition-all duration-200 ${selectedJobId === job._id ? 'ring-2 ring-blue-400 rounded-xl' : ''}`}>
                        <PostedJobCard {...job} id={job._id} />
                      </div>
                      <Menu position="right" shadow="md" width={200}>
                        <Menu.Target><ActionIcon variant="subtle" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}><IconDotsVertical size={16} /></ActionIcon></Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconEye size={14} />} onClick={() => onJobSelect?.(job._id)}>View Details</Menu.Item>
                          <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => handleEditJob(job)}>Edit Job</Menu.Item>
                          <Menu.Item leftSection={<IconCopy size={14} />} onClick={() => handleDuplicateJob(job)}>Duplicate</Menu.Item>
                          <Menu.Item leftSection={<IconArchive size={14} />} onClick={() => handleArchiveJob(job._id)}>Archive</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconSend size={14} />} color="green" onClick={() => handlePublishJob(job._id)}>Republish</Menu.Item>
                          <Menu.Item leftSection={<IconTrash size={14} />} color="red" onClick={() => confirmDelete(job)}>Delete</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  ))
                )}
              </Tabs.Panel>

              <Tabs.Panel value="draft">
                {draftJobs.length === 0 ? (
                  <div className="text-center py-12"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"><IconArchive size={24} className="text-gray-400" /></div><p className="text-gray-500">No draft jobs</p></div>
                ) : (
                  draftJobs.map((job) => (
                    <div key={job._id} className="group relative">
                      <div onClick={() => onJobSelect?.(job._id)} className={`cursor-pointer transition-all duration-200 opacity-80 hover:opacity-100 ${selectedJobId === job._id ? 'ring-2 ring-blue-400 rounded-xl' : ''}`}>
                        <PostedJobCard {...job} id={job._id} />
                      </div>
                      <Menu position="right" shadow="md" width={200}>
                        <Menu.Target><ActionIcon variant="subtle" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}><IconDotsVertical size={16} /></ActionIcon></Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconEye size={14} />} onClick={() => onJobSelect?.(job._id)}>View Details</Menu.Item>
                          <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => handleEditJob(job)}>Edit & Complete</Menu.Item>
                          <Menu.Item leftSection={<IconSend size={14} />} color="green" onClick={() => handlePublishJob(job._id)}>Publish Now</Menu.Item>
                          <Menu.Item leftSection={<IconCopy size={14} />} onClick={() => handleDuplicateJob(job)}>Duplicate</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconTrash size={14} />} color="red" onClick={() => confirmDelete(job)}>Delete Draft</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </div>
                  ))
                )}
              </Tabs.Panel>
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Create/Edit Job Modal */}
      <Modal opened={opened} onClose={() => { close(); resetForm(); }} title={editingJob ? 'Edit Job' : 'Create New Job'} size="lg" radius="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Job Title *" value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} required />
            <TextInput label="Company Name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Your company name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextInput label="Location *" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
            <TextInput label="Department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select label="Job Type" data={['Full-time', 'Part-time', 'Contract', 'Internship']} value={formData.jobType} onChange={(value) => setFormData({ ...formData, jobType: value || 'Full-time' })} />
            <Select label="Experience" data={['0-1 years', '1-3 years', '3-5 years', '5-7 years', '7+ years']} value={formData.experience} onChange={(value) => setFormData({ ...formData, experience: value || '1-3 years' })} />
            <NumberInput label="Openings" min={1} max={50} value={formData.openings} onChange={(value) => setFormData({ ...formData, openings: typeof value === 'number' ? value : 1 })} />
          </div>
          <TextInput label="Salary Range" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} placeholder="e.g., $80k - $100k" />
          <Textarea label="Job Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} minRows={4} placeholder="Describe the role, responsibilities, and benefits..." />
          <Textarea label="Skills/Requirements (comma-separated)" value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} minRows={2} placeholder="e.g., React, TypeScript, Node.js" />
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreateJob} loading={submitting} className="flex-1 bg-blue-600">{editingJob ? 'Update Job' : 'Post Job'}</Button>
            <Button onClick={() => { close(); resetForm(); }} variant="light" color="gray" className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Job" centered>
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><IconTrash size={28} className="text-red-600" /></div>
          <h3 className="text-lg font-semibold mb-2">Delete This Job?</h3>
          <p className="text-gray-500 text-sm mb-6">Are you sure you want to delete "{jobToDelete?.jobTitle}"? This action cannot be undone.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => setDeleteModalOpen(false)} variant="light">Cancel</Button>
            <Button onClick={handleDeleteJob} color="red">Delete</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostedJob;