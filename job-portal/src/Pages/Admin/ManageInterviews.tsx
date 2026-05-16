import { useState, useEffect, useCallback } from "react";
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
  Loader,
  Tooltip,
  Divider,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconSearch,
  IconEye,
  IconRefresh,
  IconVideo,
  IconBuilding,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";
import adminApi from "../../services/adminApi";

interface Interview {
  _id: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  candidateId: string;
  jobId: string;
  date: string;
  time: string;
  mode: "online" | "offline";
  link?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

const ManageInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null,
  );
  const [viewModalOpen, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [statusModalOpen, { open: openStatusModal, close: closeStatusModal }] =
    useDisclosure(false);
  const [newStatus, setNewStatus] = useState("");

  const loadInterviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.get("/interviews", {
        params: { page, limit: itemsPerPage, search },
      });
      if (response.data.success) {
        setInterviews(response.data.interviews || []);
      }
    } catch (error: any) {
      console.error("Error loading interviews:", error);
      // Mock data for demo
      setInterviews([
        {
          _id: "1",
          jobTitle: "Senior Software Engineer",
          candidateName: "John Doe",
          candidateEmail: "john@example.com",
          candidateId: "1",
          jobId: "1",
          date: new Date().toISOString().split("T")[0],
          time: "10:00 AM",
          mode: "online",
          link: "https://meet.google.com/abc-defg-hij",
          status: "scheduled",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          jobTitle: "Frontend Developer",
          candidateName: "Jane Smith",
          candidateEmail: "jane@example.com",
          candidateId: "2",
          jobId: "2",
          date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          time: "2:00 PM",
          mode: "offline",
          status: "scheduled",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [page, search, itemsPerPage]);

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  const updateStatus = async () => {
    if (!selectedInterview || !newStatus) return;

    try {
      const response = await adminApi.put(
        `/interviews/${selectedInterview._id}/status`,
        { status: newStatus },
      );
      if (response.data.success) {
        notifications.show({
          title: "Success",
          message: `Interview status updated to ${newStatus}`,
          color: "green",
        });
        closeStatusModal();
        loadInterviews();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update status",
        color: "red",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge color="blue">Scheduled</Badge>;
      case "completed":
        return <Badge color="green">Completed</Badge>;
      case "cancelled":
        return <Badge color="red">Cancelled</Badge>;
      default:
        return <Badge color="gray">{status}</Badge>;
    }
  };

  const getModeIcon = (mode: string) => {
    return mode === "online" ? (
      <IconVideo size={14} />
    ) : (
      <IconBuilding size={14} />
    );
  };

  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.candidateName?.toLowerCase().includes(search.toLowerCase()) ||
      interview.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
      interview.candidateEmail?.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedInterviews = filteredInterviews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);

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
        <Title order={2}>Manage Interviews</Title>
        <Text className="text-gray-500">
          View and manage all scheduled interviews
        </Text>
      </div>

      <Paper p="md" radius="md" withBorder>
        <div className="flex justify-between mb-4 flex-wrap gap-3">
          <TextInput
            placeholder="Search by candidate or job..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Button
            onClick={loadInterviews}
            leftSection={<IconRefresh size={16} />}
            variant="light"
          >
            Refresh
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Candidate</Table.Th>
                <Table.Th>Job Title</Table.Th>
                <Table.Th>Date & Time</Table.Th>
                <Table.Th>Mode</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedInterviews.length === 0 ? (
                <Table.Tr>
                  <Table.Td
                    colSpan={6}
                    className="text-center text-gray-500 py-8"
                  >
                    No interviews found
                  </Table.Td>
                </Table.Tr>
              ) : (
                paginatedInterviews.map((interview) => (
                  <Table.Tr key={interview._id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="md" radius="xl" color="blue">
                          {interview.candidateName?.charAt(0) || "?"}
                        </Avatar>
                        <div>
                          <Text fw={500}>{interview.candidateName}</Text>
                          <Text size="xs" className="text-gray-500">
                            {interview.candidateEmail}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td fw={500}>{interview.jobTitle}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <IconCalendar size={14} className="text-gray-400" />
                        <Text size="sm">
                          {new Date(interview.date).toLocaleDateString()}
                        </Text>
                        <IconClock size={14} className="text-gray-400" />
                        <Text size="sm">{interview.time}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        variant="light"
                        color={interview.mode === "online" ? "blue" : "gray"}
                        leftSection={getModeIcon(interview.mode)}
                      >
                        {interview.mode === "online" ? "Online" : "Offline"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{getStatusBadge(interview.status)}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="View Details">
                          <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={() => {
                              setSelectedInterview(interview);
                              openViewModal();
                            }}
                          >
                            <IconEye size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Change Status">
                          <ActionIcon
                            variant="light"
                            color="green"
                            onClick={() => {
                              setSelectedInterview(interview);
                              setNewStatus(interview.status);
                              openStatusModal();
                            }}
                          >
                            <IconEye size={18} />
                          </ActionIcon>
                        </Tooltip>
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

      {/* View Interview Modal */}
      <Modal
        opened={viewModalOpen}
        onClose={closeViewModal}
        title="Interview Details"
        size="lg"
      >
        {selectedInterview && (
          <Stack gap="md">
            <div className="flex items-center gap-4">
              <Avatar size="xl" radius="xl" color="blue">
                {selectedInterview.candidateName?.charAt(0) || "?"}
              </Avatar>
              <div>
                <Text fw={700} size="xl">
                  {selectedInterview.candidateName}
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedInterview.candidateEmail}
                </Text>
              </div>
            </div>
            <Divider />
            <div>
              <Text fw={600}>Job Title</Text>
              <Text>{selectedInterview.jobTitle}</Text>
            </div>
            <div>
              <Text fw={600}>Date & Time</Text>
              <Text>
                {new Date(selectedInterview.date).toLocaleDateString()} at{" "}
                {selectedInterview.time}
              </Text>
            </div>
            <div>
              <Text fw={600}>Mode</Text>
              <Badge
                variant="light"
                color={selectedInterview.mode === "online" ? "blue" : "gray"}
              >
                {selectedInterview.mode === "online" ? "Online" : "Offline"}
              </Badge>
            </div>
            {selectedInterview.link && (
              <div>
                <Text fw={600}>Meeting Link</Text>
                <a
                  href={selectedInterview.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {selectedInterview.link}
                </a>
              </div>
            )}
            <div>
              <Text fw={600}>Status</Text>
              {getStatusBadge(selectedInterview.status)}
            </div>
            <div>
              <Text fw={600}>Scheduled On</Text>
              <Text>
                {new Date(selectedInterview.createdAt).toLocaleString()}
              </Text>
            </div>
          </Stack>
        )}
      </Modal>

      {/* Update Status Modal */}
      <Modal
        opened={statusModalOpen}
        onClose={closeStatusModal}
        title="Update Interview Status"
        centered
      >
        <Stack gap="md">
          <Text>
            Interview with <strong>{selectedInterview?.candidateName}</strong>{" "}
            for <strong>{selectedInterview?.jobTitle}</strong>
          </Text>
          <Select
            label="Status"
            value={newStatus}
            onChange={(val) => setNewStatus(val || "")}
            data={[
              { value: "scheduled", label: "Scheduled" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={closeStatusModal}>
              Cancel
            </Button>
            <Button onClick={updateStatus} color="blue">
              Update Status
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default ManageInterviews;