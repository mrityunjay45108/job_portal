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
  Select,
  Pagination,
  Alert,
  Loader,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconSearch,
  IconTrash,
  IconEdit,
  IconEye,
  IconRefresh,
} from "@tabler/icons-react";
import adminApi from "../../services/adminApi";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salary: string;
  experience: string;
  description: string;
  skills: string[];
  status: string;
  applicantsCount: number;
  views: number;
  createdAt: string;
}

const skillOptions = [
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "Git",
];

const ManageJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewModalOpen, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [editModalOpen, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [editFormData, setEditFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
    description: "",
    skills: [] as string[],
    status: "",
  });

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.get("/jobs", {
        params: { page, limit: 10, search, status },
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.pages);
      }
    } catch (error: any) {
      console.error("Error loading jobs:", error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to load jobs",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setEditFormData({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      jobType: job.jobType,
      salary: job.salary,
      experience: job.experience,
      description: job.description,
      skills: job.skills || [],
      status: job.status,
    });
    openEditModal();
  };

  const handleUpdate = async () => {
    if (!selectedJob) return;

    try {
      const response = await adminApi.put(
        `/jobs/${selectedJob._id}`,
        editFormData,
      );
      if (response.data.success) {
        notifications.show({
          title: "Success",
          message: "Job updated successfully",
          color: "green",
        });
        closeEditModal();
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update job",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      const response = await adminApi.delete(`/jobs/${selectedJob._id}`);
      if (response.data.success) {
        notifications.show({
          title: "Success",
          message: "Job deleted successfully",
          color: "green",
        });
        closeDeleteModal();
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to delete job",
        color: "red",
      });
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const response = await adminApi.put(`/jobs/${jobId}`, {
        status: newStatus,
      });
      if (response.data.success) {
        notifications.show({
          title: "Status Updated",
          message: `Job status changed to ${newStatus}`,
          color: "green",
        });
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update status",
        color: "red",
      });
    }
  };

  // Fixed: Added proper types for MultiSelect
  const handleSkillChange = (value: string[]) => {
    setEditFormData({ ...editFormData, skills: value });
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
        <Title order={2} className="mb-4">
          Manage Jobs
        </Title>
        <div className="flex gap-4 flex-wrap">
          <TextInput
            placeholder="Search by job title or company..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-200"
          />
          <Select
            placeholder="Filter by status"
            value={status}
            onChange={(val) => setStatus(val || "")}
            data={[
              { value: "", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "draft", label: "Draft" },
              { value: "closed", label: "Closed" },
            ]}
            className="w-48"
            clearable
          />
          <Button
            onClick={loadJobs}
            leftSection={<IconRefresh size={16} />}
            variant="light"
          >
            Refresh
          </Button>
        </div>
      </div>

      <Paper p="md" radius="md" withBorder>
        <div className="overflow-x-auto">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Job Title</Table.Th>
                <Table.Th>Company</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Applicants</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {jobs.length === 0 ? (
                <Table.Tr>
                  <Table.Td
                    colSpan={7}
                    className="text-center text-gray-500 py-8"
                  >
                    No jobs found
                  </Table.Td>
                </Table.Tr>
              ) : (
                jobs.map((job) => (
                  <Table.Tr key={job._id}>
                    <Table.Td fw={500}>{job.jobTitle}</Table.Td>
                    <Table.Td>{job.companyName}</Table.Td>
                    <Table.Td>{job.location}</Table.Td>
                    <Table.Td>{job.jobType}</Table.Td>
                    <Table.Td>
                      <Select
                        size="xs"
                        value={job.status}
                        onChange={(val) =>
                          val && handleStatusChange(job._id, val)
                        }
                        data={[
                          { value: "active", label: "Active" },
                          { value: "draft", label: "Draft" },
                          { value: "closed", label: "Closed" },
                        ]}
                        style={{ width: 100 }}
                      />
                    </Table.Td>
                    <Table.Td>{job.applicantsCount}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => {
                            setSelectedJob(job);
                            openViewModal();
                          }}
                        >
                          <IconEye size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="green"
                          onClick={() => handleEdit(job)}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => {
                            setSelectedJob(job);
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

      {/* View Job Modal */}
      <Modal
        opened={viewModalOpen}
        onClose={closeViewModal}
        title="Job Details"
        size="lg"
      >
        {selectedJob && (
          <Stack gap="md">
            <div>
              <Text fw={600}>Job Title:</Text>
              <Text>{selectedJob.jobTitle}</Text>
            </div>
            <div>
              <Text fw={600}>Company:</Text>
              <Text>{selectedJob.companyName}</Text>
            </div>
            <div>
              <Text fw={600}>Location:</Text>
              <Text>{selectedJob.location}</Text>
            </div>
            <div>
              <Text fw={600}>Job Type:</Text>
              <Text>{selectedJob.jobType}</Text>
            </div>
            <div>
              <Text fw={600}>Salary:</Text>
              <Text>{selectedJob.salary}</Text>
            </div>
            <div>
              <Text fw={600}>Experience:</Text>
              <Text>{selectedJob.experience}</Text>
            </div>
            <div>
              <Text fw={600}>Status:</Text>
              <Badge color={selectedJob.status === "active" ? "green" : "gray"}>
                {selectedJob.status}
              </Badge>
            </div>
            <div>
              <Text fw={600}>Description:</Text>
              <Text>{selectedJob.description}</Text>
            </div>
            <div>
              <Text fw={600}>Skills:</Text>
              <Group gap="xs">
                {selectedJob.skills?.map((skill, i) => (
                  <Badge key={i} color="blue" variant="light">
                    {skill}
                  </Badge>
                ))}
              </Group>
            </div>
            <div>
              <Text fw={600}>Applicants:</Text>
              <Text>{selectedJob.applicantsCount}</Text>
            </div>
            <div>
              <Text fw={600}>Views:</Text>
              <Text>{selectedJob.views}</Text>
            </div>
          </Stack>
        )}
      </Modal>

      {/* Edit Job Modal - Fixed MultiSelect */}
      <Modal
        opened={editModalOpen}
        onClose={closeEditModal}
        title="Edit Job"
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label="Job Title"
            value={editFormData.jobTitle}
            onChange={(e) =>
              setEditFormData({ ...editFormData, jobTitle: e.target.value })
            }
          />
          <TextInput
            label="Company Name"
            value={editFormData.companyName}
            onChange={(e) =>
              setEditFormData({ ...editFormData, companyName: e.target.value })
            }
          />
          <TextInput
            label="Location"
            value={editFormData.location}
            onChange={(e) =>
              setEditFormData({ ...editFormData, location: e.target.value })
            }
          />
          <Select
            label="Job Type"
            value={editFormData.jobType}
            onChange={(val) =>
              setEditFormData({ ...editFormData, jobType: val || "" })
            }
            data={[
              "Full-time",
              "Part-time",
              "Contract",
              "Internship",
              "Freelance",
            ]}
          />
          <TextInput
            label="Salary Range"
            value={editFormData.salary}
            onChange={(e) =>
              setEditFormData({ ...editFormData, salary: e.target.value })
            }
          />
          <TextInput
            label="Experience Required"
            value={editFormData.experience}
            onChange={(e) =>
              setEditFormData({ ...editFormData, experience: e.target.value })
            }
          />
          <Textarea
            label="Description"
            value={editFormData.description}
            onChange={(e) =>
              setEditFormData({ ...editFormData, description: e.target.value })
            }
            rows={4}
          />

          {/* Fixed MultiSelect with proper types */}
          <MultiSelect
            label="Skills"
            placeholder="Select or add skills"
            value={editFormData.skills}
            onChange={handleSkillChange}
            data={skillOptions}
            searchable
            clearable
            size="md"
          />

          <Select
            label="Status"
            value={editFormData.status}
            onChange={(val) =>
              setEditFormData({ ...editFormData, status: val || "active" })
            }
            data={[
              { value: "active", label: "Active" },
              { value: "draft", label: "Draft" },
              { value: "closed", label: "Closed" },
            ]}
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
        title="Delete Job"
        centered
      >
        <Alert color="red" mb="md">
          Are you sure you want to delete{" "}
          <strong>{selectedJob?.jobTitle}</strong>? This will also delete all
          applications for this job.
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

export default ManageJobs;