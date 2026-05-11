import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Table,
  Button,
  TextInput,
  Group,
  Badge,
  ActionIcon,
  Modal,
  Stack,
  Text,
  Avatar,
  Pagination,
  Alert,
  Loader,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconSearch, IconTrash, IconEye, IconRefresh, IconEdit } from '@tabler/icons-react';
import adminApi from '../../services/adminApi';

interface Recruiter {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  jobCount: number;
  createdAt: string;
  isActive?: boolean;
}

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [viewModalOpen, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  useEffect(() => {
    loadRecruiters();
  }, [page, search]);

  const loadRecruiters = async () => {
    setLoading(true);
    try {
      const response = await adminApi.get('/recruiters', {
        params: { page, limit: 10, search }
      });
      if (response.data.success) {
        setRecruiters(response.data.recruiters);
        setTotalPages(response.data.pages);
      }
    } catch (error: any) {
      console.error('Error loading recruiters:', error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to load recruiters',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecruiter) return;
    
    try {
      const response = await adminApi.delete(`/recruiters/${selectedRecruiter._id}`);
      if (response.data.success) {
        notifications.show({
          title: 'Success',
          message: 'Recruiter and all their jobs deleted successfully',
          color: 'green',
        });
        closeDeleteModal();
        loadRecruiters();
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete recruiter',
        color: 'red',
      });
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
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <Title order={2}>Manage Recruiters</Title>
        <Group>
          <TextInput
            placeholder="Search by name or email..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Button onClick={loadRecruiters} leftSection={<IconRefresh size={16} />} variant="light">
            Refresh
          </Button>
        </Group>
      </div>

      <Paper p="md" radius="md" withBorder>
        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Recruiter</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Jobs Posted</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Joined</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recruiters.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={7} className="text-center text-gray-500 py-8">
                    No recruiters found
                  </Table.Td>
                </Table.Tr>
              ) : (
                recruiters.map((recruiter) => (
                  <Table.Tr key={recruiter._id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" radius="xl" color="green">
                          {recruiter.fullName?.charAt(0) || '?'}
                        </Avatar>
                        <Text fw={500}>{recruiter.fullName}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>{recruiter.email}</Table.Td>
                    <Table.Td>{recruiter.phoneNumber}</Table.Td>
                    <Table.Td>
                      <Badge color="blue" variant="light">
                        {recruiter.jobCount} jobs
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={recruiter.isActive !== false ? 'green' : 'red'}>
                        {recruiter.isActive !== false ? 'Active' : 'Inactive'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{new Date(recruiter.createdAt).toLocaleDateString()}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon variant="light" color="blue" onClick={() => {
                          setSelectedRecruiter(recruiter);
                          openViewModal();
                        }}>
                          <IconEye size={18} />
                        </ActionIcon>
                        <ActionIcon variant="light" color="red" onClick={() => {
                          setSelectedRecruiter(recruiter);
                          openDeleteModal();
                        }}>
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination total={totalPages} value={page} onChange={setPage} color="blue" />
          </div>
        )}
      </Paper>

      {/* View Recruiter Modal */}
      <Modal opened={viewModalOpen} onClose={closeViewModal} title="Recruiter Details" size="lg">
        {selectedRecruiter && (
          <Stack gap="md">
            <Group>
              <Avatar size="xl" radius="xl" color="green">
                {selectedRecruiter.fullName?.charAt(0) || '?'}
              </Avatar>
              <div>
                <Text fw={700} size="lg">{selectedRecruiter.fullName}</Text>
                <Text size="sm" c="dimmed">{selectedRecruiter.email}</Text>
                <Text size="sm" c="dimmed">{selectedRecruiter.phoneNumber}</Text>
              </div>
            </Group>
            <Divider />
            <div><Text fw={600}>Jobs Posted:</Text><Text>{selectedRecruiter.jobCount}</Text></div>
            <div><Text fw={600}>Joined:</Text><Text>{new Date(selectedRecruiter.createdAt).toLocaleString()}</Text></div>
          </Stack>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal opened={deleteModalOpen} onClose={closeDeleteModal} title="Delete Recruiter" centered>
        <Alert color="red" mb="md">
          Are you sure you want to delete <strong>{selectedRecruiter?.fullName}</strong>? 
          This will also delete all jobs posted by this recruiter and all applications for those jobs.
        </Alert>
        <Group justify="flex-end" gap="sm">
          <Button variant="light" onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={handleDelete}>Delete Permanently</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default ManageRecruiters;