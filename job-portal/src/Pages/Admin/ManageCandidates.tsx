import { useState, useEffect } from "react";
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
  Textarea,
  Select,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconSearch,
  IconTrash,
  IconEye,
  IconRefresh,
  IconEdit,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import adminApi from "../../services/adminApi";

interface Candidate {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  profile?: {
    title?: string;
    location?: string;
    skills?: string[];
    bio?: string;
  };
  isActive?: boolean;
  createdAt: string;
}

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [viewModalOpen, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [editModalOpen, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    profileTitle: "",
    profileLocation: "",
    profileBio: "",
  });

  useEffect(() => {
    loadCandidates();
  }, [page, search]);

  const loadCandidates = async () => {
    setLoading(true);
    try {
      const response = await adminApi.get("/candidates", {
        params: { page, limit: 10, search },
      });
      if (response.data.success) {
        setCandidates(response.data.candidates);
        setTotalPages(response.data.pages);
      }
    } catch (error: any) {
      console.error("Error loading candidates:", error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to load candidates",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setEditFormData({
      fullName: candidate.fullName,
      email: candidate.email,
      phoneNumber: candidate.phoneNumber,
      profileTitle: candidate.profile?.title || "",
      profileLocation: candidate.profile?.location || "",
      profileBio: candidate.profile?.bio || "",
    });
    openEditModal();
  };

  const handleUpdate = async () => {
    if (!selectedCandidate) return;

    try {
      const response = await adminApi.put(
        `/candidates/${selectedCandidate._id}`,
        {
          fullName: editFormData.fullName,
          email: editFormData.email,
          phoneNumber: editFormData.phoneNumber,
          profile: {
            title: editFormData.profileTitle,
            location: editFormData.profileLocation,
            bio: editFormData.profileBio,
          },
        },
      );
      if (response.data.success) {
        notifications.show({
          title: "Success",
          message: "Candidate updated successfully",
          color: "green",
        });
        closeEditModal();
        loadCandidates();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update candidate",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedCandidate) return;

    try {
      const response = await adminApi.delete(
        `/candidates/${selectedCandidate._id}`,
      );
      if (response.data.success) {
        notifications.show({
          title: "Success",
          message: "Candidate deleted successfully",
          color: "green",
        });
        closeDeleteModal();
        loadCandidates();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to delete candidate",
        color: "red",
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
        <Title order={2}>Manage Candidates</Title>
        <Group>
          <TextInput
            placeholder="Search by name or email..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Button
            onClick={loadCandidates}
            leftSection={<IconRefresh size={16} />}
            variant="light"
          >
            Refresh
          </Button>
        </Group>
      </div>

      <Paper p="md" radius="md" withBorder>
        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Candidate</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Joined</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {candidates.length === 0 ? (
                <Table.Tr>
                  <Table.Td
                    colSpan={7}
                    className="text-center text-gray-500 py-8"
                  >
                    No candidates found
                  </Table.Td>
                </Table.Tr>
              ) : (
                candidates.map((candidate) => (
                  <Table.Tr key={candidate._id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" radius="xl" color="blue">
                          {candidate.fullName?.charAt(0) || "?"}
                        </Avatar>
                        <Text fw={500}>{candidate.fullName}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>{candidate.email}</Table.Td>
                    <Table.Td>{candidate.phoneNumber}</Table.Td>
                    <Table.Td>{candidate.profile?.title || "N/A"}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={candidate.isActive !== false ? "green" : "red"}
                      >
                        {candidate.isActive !== false ? "Active" : "Inactive"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {new Date(candidate.createdAt).toLocaleDateString()}
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            openViewModal();
                          }}
                        >
                          <IconEye size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="green"
                          onClick={() => handleEdit(candidate)}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            openDeleteModal();
                          }}
                        >
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
            <Pagination
              total={totalPages}
              value={page}
              onChange={setPage}
              color="blue"
            />
          </div>
        )}
      </Paper>

      {/* View Candidate Modal */}
      <Modal
        opened={viewModalOpen}
        onClose={closeViewModal}
        title="Candidate Details"
        size="lg"
      >
        {selectedCandidate && (
          <Stack gap="md">
            <Group>
              <Avatar size="xl" radius="xl" color="blue">
                {selectedCandidate.fullName?.charAt(0) || "?"}
              </Avatar>
              <div>
                <Text fw={700} size="lg">
                  {selectedCandidate.fullName}
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedCandidate.email}
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedCandidate.phoneNumber}
                </Text>
              </div>
            </Group>
            <Divider />
            <div>
              <Text fw={600}>Title:</Text>
              <Text>{selectedCandidate.profile?.title || "Not specified"}</Text>
            </div>
            <div>
              <Text fw={600}>Location:</Text>
              <Text>
                {selectedCandidate.profile?.location || "Not specified"}
              </Text>
            </div>
            <div>
              <Text fw={600}>Bio:</Text>
              <Text>{selectedCandidate.profile?.bio || "Not specified"}</Text>
            </div>
            <div>
              <Text fw={600}>Skills:</Text>
              <Group gap="xs">
                {selectedCandidate.profile?.skills?.map((skill, i) => (
                  <Badge key={i} color="blue" variant="light">
                    {skill}
                  </Badge>
                )) || "Not specified"}
              </Group>
            </div>
            <div>
              <Text fw={600}>Joined:</Text>
              <Text>
                {new Date(selectedCandidate.createdAt).toLocaleString()}
              </Text>
            </div>
          </Stack>
        )}
      </Modal>

      {/* Edit Candidate Modal */}
      <Modal
        opened={editModalOpen}
        onClose={closeEditModal}
        title="Edit Candidate"
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label="Full Name"
            value={editFormData.fullName}
            onChange={(e) =>
              setEditFormData({ ...editFormData, fullName: e.target.value })
            }
          />
          <TextInput
            label="Email"
            value={editFormData.email}
            onChange={(e) =>
              setEditFormData({ ...editFormData, email: e.target.value })
            }
          />
          <TextInput
            label="Phone Number"
            value={editFormData.phoneNumber}
            onChange={(e) =>
              setEditFormData({ ...editFormData, phoneNumber: e.target.value })
            }
          />
          <TextInput
            label="Professional Title"
            placeholder="e.g., Senior Software Engineer"
            value={editFormData.profileTitle}
            onChange={(e) =>
              setEditFormData({ ...editFormData, profileTitle: e.target.value })
            }
          />
          <TextInput
            label="Location"
            placeholder="e.g., New York, NY"
            value={editFormData.profileLocation}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                profileLocation: e.target.value,
              })
            }
          />
          <Textarea
            label="Bio"
            placeholder="Short description about the candidate"
            rows={3}
            value={editFormData.profileBio}
            onChange={(e) =>
              setEditFormData({ ...editFormData, profileBio: e.target.value })
            }
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="blue">
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Candidate"
        centered
      >
        <Alert color="red" mb="md">
          Are you sure you want to delete{" "}
          <strong>{selectedCandidate?.fullName}</strong>? This action cannot be
          undone. All applications by this candidate will also be deleted.
        </Alert>
        <Group justify="flex-end" gap="sm">
          <Button variant="light" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete Permanently
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default ManageCandidates;
