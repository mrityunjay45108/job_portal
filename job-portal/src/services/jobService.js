import api from './api';

export const getAllJobs = async () => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, jobs: [] };
  }
};

export const getJobById = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false };
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await api.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Failed to create job' };
  }
};

export const getMyJobs = async () => {
  try {
    const response = await api.get('/jobs/my-jobs');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, jobs: [] };
  }
};