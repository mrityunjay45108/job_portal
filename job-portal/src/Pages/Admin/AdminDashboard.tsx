import { useState, useEffect } from 'react';
import {
  Container,
  SimpleGrid,
  Paper,
  Title,
  Text,
  Group,
  Skeleton,
  Table,
  Badge,
  Card,
  Alert,
  Button,
} from '@mantine/core';
import {
  IconUsers,
  IconBriefcase,
  IconFileText,
  IconCalendar,
  IconUserCheck,
  IconCheck,
  IconTrendingUp,
  IconRefresh,
} from '@tabler/icons-react';
import adminApi from '../../services/adminApi';
import { notifications } from '@mantine/notifications';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    totalInterviews: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching dashboard stats...');
      const response = await adminApi.get('/stats');
      console.log('Dashboard response:', response.data);
      
      if (response.data.success) {
        setStats(response.data.stats);
        setRecentJobs(response.data.recentJobs || []);
        setRecentApplications(response.data.recentApplications || []);
      } else {
        setError(response.data.message || 'Failed to load data');
      }
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      setError(err.response?.data?.message || 'Network error. Please check if backend is running.');
      notifications.show({
        title: 'Error',
        message: 'Failed to load dashboard data',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Candidates', value: stats.totalCandidates, icon: IconUsers, color: 'blue' },
    { label: 'Total Recruiters', value: stats.totalRecruiters, icon: IconUserCheck, color: 'green' },
    { label: 'Total Jobs', value: stats.totalJobs, icon: IconBriefcase, color: 'orange' },
    { label: 'Total Applications', value: stats.totalApplications, icon: IconFileText, color: 'purple' },
    { label: 'Active Jobs', value: stats.activeJobs, icon: IconCheck, color: 'teal' },
    { label: 'Total Interviews', value: stats.totalInterviews, icon: IconCalendar, color: 'pink' },
  ];

  if (loading) {
    return (
      <Container size="xl" className="py-8">
        <div className="mb-8">
          <Title order={2}>Dashboard Overview</Title>
          <Text>Loading dashboard data...</Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={120} radius="md" />
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" className="py-8">
        <Alert color="red" title="Error Loading Dashboard" mb="md">
          {error}
        </Alert>
        <Button onClick={loadDashboardData} leftSection={<IconRefresh size={16} />}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container size="xl" className="py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Title order={2} className="text-gray-900">Dashboard Overview</Title>
          <Text className="text-gray-500">Welcome to Admin Panel</Text>
        </div>
        <Button 
          variant="light" 
          onClick={loadDashboardData} 
          leftSection={<IconRefresh size={16} />}
          loading={loading}
        >
          Refresh
        </Button>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 6 }} spacing="md" mb="xl">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm" p="md">
            <div className="flex justify-between items-start">
              <div>
                <Text size="xs" className="text-gray-500 uppercase tracking-wider">{stat.label}</Text>
                <Text size="28px" fw={700} className="text-gray-900 mt-1">{stat.value}</Text>
              </div>
              <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                <stat.icon size={20} className={`text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </SimpleGrid>

      {/* Recent Jobs */}
      <Paper p="md" radius="md" withBorder className="bg-white mb-6">
        <Title order={3} className="mb-4">Recent Jobs Posted</Title>
        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Job Title</Table.Th>
                <Table.Th>Company</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Applicants</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentJobs.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={4} className="text-center text-gray-500 py-8">
                    No jobs found. Create some jobs to see them here.
                  </Table.Td>
                </Table.Tr>
              ) : (
                recentJobs.map((job: any) => (
                  <Table.Tr key={job._id}>
                    <Table.Td fw={500}>{job.jobTitle}</Table.Td>
                    <Table.Td>{job.companyName}</Table.Td>
                    <Table.Td>
                      <Badge color={job.status === 'active' ? 'green' : 'gray'}>
                        {job.status || 'N/A'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{job.applicantsCount || 0}</Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </div>
      </Paper>

      {/* Recent Applications */}
      <Paper p="md" radius="md" withBorder className="bg-white">
        <Title order={3} className="mb-4">Recent Applications</Title>
        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Candidate</Table.Th>
                <Table.Th>Job</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentApplications.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={4} className="text-center text-gray-500 py-8">
                    No applications found. Candidates will appear here when they apply.
                  </Table.Td>
                </Table.Tr>
              ) : (
                recentApplications.map((app: any) => (
                  <Table.Tr key={app._id}>
                    <Table.Td fw={500}>{app.candidateName}</Table.Td>
                    <Table.Td>{app.jobId?.jobTitle || 'N/A'}</Table.Td>
                    <Table.Td>
                      <Badge 
                        color={
                          app.status === 'pending' ? 'yellow' :
                          app.status === 'shortlisted' ? 'green' :
                          app.status === 'interview' ? 'blue' :
                          app.status === 'hired' ? 'teal' : 'red'
                        }
                      >
                        {app.status || 'N/A'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{new Date(app.appliedDate).toLocaleDateString()}</Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </div>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;