import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Title,
  Table,
  Group,
  Badge,
  ActionIcon,
  Modal,
  Stack,
  Text,
  Avatar,
  Select,
  Pagination,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEye } from '@tabler/icons-react';
import adminApi from '../../services/adminApi';

interface Application {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  jobId: {
    jobTitle: string;
    companyName: string;
  };
  status: string;
  coverLetter?: string;
  experience?: string;
  skills?: string;
  expectedSalary?: string;
  appliedDate: string;
}

const ManageApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [viewModalOpen, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.get('/applications', {
        params: { page, limit: 10, status }
      });
      if (response.data.success) {
        setApplications(response.data.applications);
        setTotalPages(response.data.pages);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to load applications',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'shortlisted': return 'green';
      case 'interview': return 'blue';
      case 'hired': return 'teal';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  if (loading) {
    return (
      <Container size="xl" className="py-8 flex justify-center">
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <Container size="xl" className="py-8">
      <div className="mb-6">
        <Title order={2} className="mb-4">Manage Applications</Title>
        <Select
          placeholder="Filter by status"
          value={status}
          onChange={(val) => setStatus(val || '')}
          data={[
            { value: '', label: 'All Status' },
            { value: 'pending', label: 'Pending' },
            { value: 'shortlisted', label: 'Shortlisted' },
            { value: 'interview', label: 'Interview' },
            { value: 'hired', label: 'Hired' },
            { value: 'rejected', label: 'Rejected' },
          ]}
          className="w-64"
          clearable
        />
      </div>

      <Paper p="md" radius="md" withBorder>
        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Candidate</Table.Th>
                <Table.Th>Job</Table.Th>
                <Table.Th>Company</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Applied Date</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {applications.map((app) => (
                <Table.Tr key={app._id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius="xl" color="blue">
                        {app.candidateName?.charAt(0) || '?'}
                      </Avatar>
                      <div>
                        <Text fw={500}>{app.candidateName}</Text>
                        <Text size="xs" className="text-gray-500">{app.candidateEmail}</Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>{app.jobId?.jobTitle || 'N/A'}</Table.Td>
                  <Table.Td>{app.jobId?.companyName || 'N/A'}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(app.status)}>
                      {app.status.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{new Date(app.appliedDate).toLocaleDateString()}</Table.Td>
                  <Table.Td>
                    <ActionIcon variant="light" color="blue" onClick={() => {
                      setSelectedApp(app);
                      openViewModal();
                    }}>
                      <IconEye size={18} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination total={totalPages} value={page} onChange={setPage} color="blue" />
          </div>
        )}
      </Paper>

      {/* View Application Modal */}
      <Modal opened={viewModalOpen} onClose={closeViewModal} title="Application Details" size="lg">
        {selectedApp && (
          <Stack gap="md">
            <div>
              <Text fw={600}>Candidate</Text>
              <Text>{selectedApp.candidateName}</Text>
              <Text size="sm" className="text-gray-500">{selectedApp.candidateEmail}</Text>
            </div>
            
            <div>
              <Text fw={600}>Job Position</Text>
              <Text>{selectedApp.jobId?.jobTitle}</Text>
              <Text size="sm" className="text-gray-500">{selectedApp.jobId?.companyName}</Text>
            </div>
            
            <div>
              <Text fw={600}>Status</Text>
              <Badge color={getStatusColor(selectedApp.status)}>
                {selectedApp.status.toUpperCase()}
              </Badge>
            </div>
            
            {selectedApp.experience && (
              <div>
                <Text fw={600}>Experience</Text>
                <Text>{selectedApp.experience}</Text>
              </div>
            )}
            
            {selectedApp.skills && (
              <div>
                <Text fw={600}>Skills</Text>
                <Text>{selectedApp.skills}</Text>
              </div>
            )}
            
            {selectedApp.expectedSalary && (
              <div>
                <Text fw={600}>Expected Salary</Text>
                <Text>{selectedApp.expectedSalary}</Text>
              </div>
            )}
            
            {selectedApp.coverLetter && (
              <div>
                <Text fw={600}>Cover Letter</Text>
                <Paper p="sm" withBorder className="bg-gray-50">
                  <Text size="sm">{selectedApp.coverLetter}</Text>
                </Paper>
              </div>
            )}
            
            <div>
              <Text fw={600}>Applied Date</Text>
              <Text>{new Date(selectedApp.appliedDate).toLocaleString()}</Text>
            </div>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default ManageApplications;