import api from './api';

export const applyForJob = async (applicationData) => {
  try {
    const response = await api.post('/applications/apply', applicationData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Failed to apply' };
  }
};
export const getMyApplications = async () => {
  try {
    const response = await api.get('/applications/my-applications');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, applications: [] };
  }
};

export const getRecruiterApplications = async () => {
  try {
    const response = await api.get('/applications/recruiter');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, applications: [] };
  }
};

export const updateApplicationStatus = async (id, status, feedback) => {
  try {
    const response = await api.put(`/applications/${id}/status`, { status, feedback });
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Failed to update status' };
  }
};