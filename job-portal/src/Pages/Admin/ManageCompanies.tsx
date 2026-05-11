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
  Loader,
  Tooltip,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconSearch,
  IconEye,
  IconTrash,
  IconRefresh,
  IconBuilding,
  IconWorld,
  IconMapPin,
} from "@tabler/icons-react";
import adminApi from "../../services/adminApi";

interface Company {
  _id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  logo: string;
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
}

const ManageCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [viewModalOpen, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [deleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  useEffect(() => {
    loadCompanies();
  }, [page, search]);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const response = await adminApi.get("/companies", {
        params: { page, limit: itemsPerPage, search },
      });
      if (response.data.success) {
        setCompanies(response.data.companies || []);
      }
    } catch (error: any) {
      console.error("Error loading companies:", error);
      // Mock data for demo
      setCompanies([
        {
          _id: "1",
          name: "Tech Corp",
          description:
            "Leading technology company specializing in software development",
          location: "New York, NY",
          website: "https://techcorp.com",
          logo: "",
          createdBy: {
            _id: "1",
            fullName: "John Doe",
            email: "john@techcorp.com",
          },
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          name: "Innovate Inc",
          description: "Innovation hub for next-gen solutions",
          location: "San Francisco, CA",
          website: "https://innovate.com",
          logo: "",
          createdBy: {
            _id: "2",
            fullName: "Jane Smith",
            email: "jane@innovate.com",
          },
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCompany) return;

    try {
      await adminApi.delete(`/companies/${selectedCompany._id}`);
      notifications.show({
        title: "Success",
        message: "Company deleted successfully",
        color: "green",
      });
      closeDeleteModal();
      loadCompanies();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to delete company",
        color: "red",
      });
    }
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name?.toLowerCase().includes(search.toLowerCase()) ||
      company.createdBy?.fullName?.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

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
        <Title order={2}>Manage Companies</Title>
        <Text className="text-gray-500">
          View and manage all registered companies
        </Text>
      </div>

      <Paper p="md" radius="md" withBorder>
        <div className="flex justify-between mb-4 flex-wrap gap-3">
          <TextInput
            placeholder="Search by company or recruiter..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
          <Button
            onClick={loadCompanies}
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
                <Table.Th>Company</Table.Th>
                <Table.Th>Recruiter</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Website</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedCompanies.length === 0 ? (
                <Table.Tr>
                  <Table.Td
                    colSpan={5}
                    className="text-center text-gray-500 py-8"
                  >
                    No companies found
                  </Table.Td>
                </Table.Tr>
              ) : (
                paginatedCompanies.map((company) => (
                  <Table.Tr key={company._id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="md" radius="xl" color="blue">
                          {company.name?.charAt(0) || "C"}
                        </Avatar>
                        <div>
                          <Text fw={500}>{company.name}</Text>
                          <Text
                            size="xs"
                            className="text-gray-500"
                            lineClamp={1}
                          >
                            {company.description?.substring(0, 50) ||
                              "No description"}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="sm">
                          {company.createdBy?.fullName || "N/A"}
                        </Text>
                        <Text size="xs" className="text-gray-500">
                          {company.createdBy?.email}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <IconMapPin size={14} className="text-gray-400" />
                        <Text size="sm">{company.location || "N/A"}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <IconWorld size={14} />
                          <span>Visit</span>
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="View Details">
                          <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={() => {
                              setSelectedCompany(company);
                              openViewModal();
                            }}
                          >
                            <IconEye size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete Company">
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => {
                              setSelectedCompany(company);
                              openDeleteModal();
                            }}
                          >
                            <IconTrash size={18} />
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

      {/* View Company Modal */}
      <Modal
        opened={viewModalOpen}
        onClose={closeViewModal}
        title="Company Details"
        size="lg"
      >
        {selectedCompany && (
          <Stack gap="md">
            <div className="flex items-center gap-4">
              <Avatar size="xl" radius="xl" color="blue">
                {selectedCompany.name?.charAt(0) || "C"}
              </Avatar>
              <div>
                <Text fw={700} size="xl">
                  {selectedCompany.name}
                </Text>
                <Text size="sm" c="dimmed">
                  Registered by: {selectedCompany.createdBy?.fullName}
                </Text>
              </div>
            </div>
            <Divider />
            <div>
              <Text fw={600}>Description</Text>
              <Text>
                {selectedCompany.description || "No description provided"}
              </Text>
            </div>
            <div>
              <Text fw={600}>Location</Text>
              <Text>{selectedCompany.location || "Not specified"}</Text>
            </div>
            <div>
              <Text fw={600}>Website</Text>
              {selectedCompany.website ? (
                <a
                  href={selectedCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {selectedCompany.website}
                </a>
              ) : (
                "Not specified"
              )}
            </div>
            <div>
              <Text fw={600}>Recruiter Email</Text>
              <Text>{selectedCompany.createdBy?.email || "N/A"}</Text>
            </div>
            <div>
              <Text fw={600}>Registered On</Text>
              <Text>
                {new Date(selectedCompany.createdAt).toLocaleDateString()}
              </Text>
            </div>
          </Stack>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Company"
        centered
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to delete{" "}
            <strong>{selectedCompany?.name}</strong>?
          </Text>
          <Text size="sm" className="text-red-500">
            ⚠️ This action cannot be undone. This will also delete all jobs
            posted by this company.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete Company
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default ManageCompanies;
