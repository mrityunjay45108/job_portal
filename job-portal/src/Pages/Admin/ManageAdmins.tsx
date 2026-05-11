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
  PasswordInput,
  Alert,
  Loader,
  Select,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTrash, IconPlus, IconRefresh } from '@tabler/icons-react';
import adminApi from '../../services/adminApi';

interface Admin {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const ManageAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [createModalOpen, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const response = await adminApi.get('/admins');
      if (response.data.success) {
        setAdmins(response.data.admins);
      }
    } catch (error: any) {
      console.error('Error loading admins:', error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to load admins',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      notifications.show({
        title: 'Error',
        message: 'Please fill all required fields',
        color: 'red',
      });
      return;
    }

    try {
      const response = await adminApi.post('/admins', formData);
      if (response.data.success) {
        notifications.show({
          title: 'Success',
          message: 'Admin created successfully',
          color: 'green',
        });
        closeCreateModal();
        setFormData({ fullName: '', email: '', password: '', role: 'admin' });
        loadAdmins();
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to create admin',
        color: 'red',
      });
    }
  };

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin) return;
    
    try {
      const response = await adminApi.delete(`/admins/${selectedAdmin._id}`);
      if (response.data.success) {
        notifications.show({
          title: 'Success',
          message: 'Admin deleted successfully',
          color: 'green',
        });
        closeDeleteModal();
        loadAdmins();
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete admin',
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
        <Title order={2}>Manage Administrators</Title>
        {adminData.role === 'super_admin' && (
          <Button leftSection={<IconPlus size={18} />} onClick={openCreateModal} color="blue">
            Add New Admin
          </Button>
        )}
      </div>

      <Paper p="md" radius="md" withBorder>
        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Admin</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {admins.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={6} className="text-center text-gray-500 py-8">
                    No admins found
                  </Table.Td>
                </Table.Tr>
              ) : (
                admins.map((admin) => (
                  <Table.Tr key={admin._id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" radius="xl" color="blue">
                          {admin.fullName?.charAt(0) || '?'}
                        </Avatar>
                        <Text fw={500}>{admin.fullName}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>{admin.email}</Table.Td>
                    <Table.Td>
                      <Badge color={admin.role === 'super_admin' ? 'red' : 'blue'}>
                        {admin.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={admin.isActive ? 'green' : 'red'}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{new Date(admin.createdAt).toLocaleDateString()}</Table.Td>
                    <Table.Td>
                      {adminData.role === 'super_admin' && admin.role !== 'super_admin' && (
                        <ActionIcon variant="light" color="red" onClick={() => {
                          setSelectedAdmin(admin);
                          openDeleteModal();
                        }}>
                          <IconTrash size={18} />
                        </ActionIcon>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </div>
      </Paper>

      {/* Create Admin Modal */}
      <Modal opened={createModalOpen} onClose={closeCreateModal} title="Create New Admin" size="lg">
        <Stack gap="md">
          <TextInput
            label="Full Name"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          <TextInput
            label="Email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Select
            label="Role"
            value={formData.role}
            onChange={(val) => setFormData({ ...formData, role: val || 'admin' })}
            data={[
              { value: 'admin', label: 'Admin' },
              { value: 'moderator', label: 'Moderator' },
            ]}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={closeCreateModal}>Cancel</Button>
            <Button onClick={handleCreateAdmin} color="blue">Create Admin</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal opened={deleteModalOpen} onClose={closeDeleteModal} title="Delete Admin" centered>
        <Alert color="red" mb="md">
          Are you sure you want to delete <strong>{selectedAdmin?.fullName}</strong>? 
          This action cannot be undone.
        </Alert>
        <Group justify="flex-end" gap="sm">
          <Button variant="light" onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={handleDeleteAdmin}>Delete Permanently</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default ManageAdmins;