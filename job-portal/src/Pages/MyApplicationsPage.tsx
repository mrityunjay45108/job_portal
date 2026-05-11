import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Card,
  Badge,
  Divider,
  Group,
  Stack,
  Grid,
  Avatar,
  Progress,
  Alert,
  Loader,
  Tabs,
  SimpleGrid,
  ActionIcon,
  Tooltip,
  Modal,
  Skeleton
} from "@mantine/core";
import {
  IconBriefcase,
  IconCalendar,
  IconClock,
  IconCheck,
  IconX,
  IconEye,
  IconTrash,
  IconFileText,
  IconSend,
  IconStar,
  IconAward,
  IconTrendingUp,
  IconArrowRight,
  IconBuilding,
  IconMapPin,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import api from "../services/api";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "pending" | "shortlisted" | "interview" | "rejected" | "hired" | "reviewing";
  coverLetter?: string;
  matchScore?: number;
  feedback?: string;
  resumeUrl?: string;
}

// Skeleton Loader Component
const ApplicationsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <Container size="xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton circle height={48} width={48} />
            <div>
              <Skeleton height={28} width={200} radius="md" />
              <Skeleton height={16} width={250} mt={5} radius="md" />
            </div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="p-5 rounded-xl">
              <Skeleton height={14} width={100} radius="md" />
              <Skeleton height={32} width={60} mt={5} radius="md" />
            </Card>
          ))}
        </div>

        {/* Applications List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-5 rounded-xl border border-gray-200">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Skeleton height={24} width={200} radius="md" />
                    <Skeleton height={28} width={120} radius="xl" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton height={16} width={120} radius="md" />
                    <Skeleton circle height={4} width={4} />
                    <Skeleton height={16} width={100} radius="md" />
                  </div>
                  <Skeleton height={8} width="60%" radius="xl" />
                  <div className="mt-3">
                    <Skeleton height={60} width="100%" radius="md" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton circle height={40} width={40} />
                  <Skeleton circle height={40} width={40} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

const MyApplicationsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [withdrawConfirmOpen, setWithdrawConfirmOpen] = useState(false);
  const [applicationToWithdraw, setApplicationToWithdraw] = useState<Application | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user?.role !== "candidate") {
      navigate("/");
      return;
    }

    loadApplications();
  }, [isAuthenticated, user, navigate]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const response = await api.get("/applications/my-applications");
      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error: any) {
      console.error("Error loading applications:", error);
      notifications.show({
        title: "Error",
        message: "Failed to load applications",
        color: "red",
      });
      // Fallback to localStorage
      const stored = localStorage.getItem(`candidate_applications_${user?.id || "guest"}`);
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async () => {
    if (!applicationToWithdraw) return;

    try {
      const response = await api.delete(`/applications/${applicationToWithdraw.id}/withdraw`);
      if (response.data.success) {
        notifications.show({
          title: "Application Withdrawn",
          message: `You have withdrawn your application for ${applicationToWithdraw.jobTitle}`,
          color: "orange",
        });
        loadApplications();
        setWithdrawConfirmOpen(false);
        setApplicationToWithdraw(null);
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to withdraw application",
        color: "red",
      });
    }
  };

  const viewDetails = (application: Application) => {
    setSelectedApplication(application);
    setDetailsOpen(true);
  };

  const getStatusConfig = (status: string) => {
    const config: Record<string, { color: string; label: string; icon: React.ReactNode; progress: number }> = {
      pending: { color: "yellow", label: "Application Submitted", icon: <IconSend size={14} />, progress: 20 },
      reviewing: { color: "blue", label: "Under Review", icon: <IconEye size={14} />, progress: 40 },
      shortlisted: { color: "green", label: "Shortlisted", icon: <IconStar size={14} />, progress: 60 },
      interview: { color: "indigo", label: "Interview Scheduled", icon: <IconBriefcase size={14} />, progress: 80 },
      hired: { color: "teal", label: "Hired! 🎉", icon: <IconAward size={14} />, progress: 100 },
      rejected: { color: "red", label: "Not Selected", icon: <IconX size={14} />, progress: 100 },
    };
    return config[status] || { color: "gray", label: status, icon: null, progress: 0 };
  };

  const getStatusBadge = (status: string) => {
    const config = getStatusConfig(status);
    return (
      <Badge color={config.color} size="lg" variant="light" leftSection={config.icon}>
        {config.label}
      </Badge>
    );
  };

  const getTimeAgo = (date: string) => {
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const stats = {
    total: applications.length,
    active: applications.filter(a => !["rejected", "hired"].includes(a.status)).length,
    shortlisted: applications.filter(a => a.status === "shortlisted").length,
    interviews: applications.filter(a => a.status === "interview").length,
    hired: applications.filter(a => a.status === "hired").length,
  };

  // Show skeleton while loading
  if (loading) {
    return <ApplicationsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <IconBriefcase size={24} className="text-white" />
            </div>
            <div>
              <Title order={1} className="text-2xl font-bold text-gray-900">
                My Applications
              </Title>
              <Text className="text-gray-500">Track and manage all your job applications</Text>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <SimpleGrid cols={{ base: 2, md: 5 }} spacing="md" className="mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl">
            <Text size="sm" opacity={0.8}>Total Applications</Text>
            <Text size="32px" fw={800}>{stats.total}</Text>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl">
            <Text size="sm" opacity={0.8}>Active</Text>
            <Text size="32px" fw={800}>{stats.active}</Text>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl">
            <Text size="sm" opacity={0.8}>Shortlisted</Text>
            <Text size="32px" fw={800}>{stats.shortlisted}</Text>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl">
            <Text size="sm" opacity={0.8}>Interviews</Text>
            <Text size="32px" fw={800}>{stats.interviews}</Text>
          </Card>
          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl">
            <Text size="sm" opacity={0.8}>Hired</Text>
            <Text size="32px" fw={800}>{stats.hired}</Text>
          </Card>
        </SimpleGrid>

        {/* Applications List */}
        {applications.length === 0 ? (
          <Paper className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconBriefcase size={32} className="text-gray-400" />
            </div>
            <Title order={3} className="text-gray-700 mb-2">No Applications Yet</Title>
            <Text className="text-gray-500 mb-6">You haven't applied for any jobs yet.</Text>
            <Button onClick={() => navigate("/find-jobs")} className="bg-blue-600">
              Browse Jobs
            </Button>
          </Paper>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const statusConfig = getStatusConfig(app.status);
              return (
                <Card key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <Text size="lg" fw={600} className="text-gray-900">
                          {app.jobTitle}
                        </Text>
                        {getStatusBadge(app.status)}
                        {app.matchScore && (
                          <Badge color="blue" size="sm" variant="light">
                            Match: {app.matchScore}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <IconBuilding size={14} />
                          <span>{app.company}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="flex items-center gap-1">
                          <IconCalendar size={14} />
                          <span>Applied {getTimeAgo(app.appliedDate)}</span>
                        </div>
                      </div>

                      {/* Progress bar for active applications */}
                      {!["rejected", "hired"].includes(app.status) && (
                        <div className="mt-3 max-w-md">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Application Progress</span>
                            <span>{statusConfig.progress}%</span>
                          </div>
                          <Progress value={statusConfig.progress} color={statusConfig.color} size="sm" radius="xl" />
                        </div>
                      )}

                      {/* Feedback if available */}
                      {app.feedback && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <Text size="xs" fw={600} className="text-blue-800 mb-1">Recruiter Feedback:</Text>
                          <Text size="xs" className="text-blue-700">{app.feedback}</Text>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Tooltip label="View Details">
                        <ActionIcon variant="light" color="blue" size="lg" onClick={() => viewDetails(app)}>
                          <IconEye size={18} />
                        </ActionIcon>
                      </Tooltip>
                      {(app.status === "pending" || app.status === "reviewing") && (
                        <Tooltip label="Withdraw Application">
                          <ActionIcon
                            variant="light"
                            color="red"
                            size="lg"
                            onClick={() => {
                              setApplicationToWithdraw(app);
                              setWithdrawConfirmOpen(true);
                            }}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Application Details Modal */}
        <Modal
          opened={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          title="Application Details"
          size="lg"
          radius="lg"
        >
          {selectedApplication && (
            <Stack gap="md">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                <Text fw={700} size="lg">{selectedApplication.jobTitle}</Text>
                <Text size="sm" className="text-gray-600">{selectedApplication.company}</Text>
                <div className="flex items-center gap-2 mt-2">
                  <IconCalendar size={14} className="text-gray-400" />
                  <Text size="xs" className="text-gray-500">
                    Applied on {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                  </Text>
                </div>
              </div>

              <Divider />

              <div>
                <Text fw={600} className="mb-2">Application Status</Text>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedApplication.status)}
                  {selectedApplication.matchScore && (
                    <Badge color="blue" variant="light">Match Score: {selectedApplication.matchScore}%</Badge>
                  )}
                </div>
              </div>

              {selectedApplication.coverLetter && (
                <div>
                  <Text fw={600} className="mb-2">Cover Letter</Text>
                  <Paper className="bg-gray-50 p-3 rounded-lg">
                    <Text size="sm" className="text-gray-700">{selectedApplication.coverLetter}</Text>
                  </Paper>
                </div>
              )}

              {selectedApplication.feedback && (
                <div>
                  <Text fw={600} className="mb-2">Recruiter Feedback</Text>
                  <Alert color="blue" className="bg-blue-50">
                    <Text size="sm">{selectedApplication.feedback}</Text>
                  </Alert>
                </div>
              )}

              <Divider />

              <div className="flex gap-3">
                {selectedApplication.resumeUrl && (
                  <Button
                    component="a"
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    variant="light"
                    leftSection={<IconFileText size={16} />}
                    className="flex-1"
                  >
                    View Resume
                  </Button>
                )}
                <Button onClick={() => setDetailsOpen(false)} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </Stack>
          )}
        </Modal>

        {/* Withdraw Confirmation Modal */}
        <Modal
          opened={withdrawConfirmOpen}
          onClose={() => setWithdrawConfirmOpen(false)}
          title="Withdraw Application"
          centered
          radius="lg"
        >
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconTrash size={28} className="text-red-600" />
            </div>
            <Title order={3} className="mb-2">Withdraw Application?</Title>
            <Text className="text-gray-500 mb-4">
              Are you sure you want to withdraw your application for <strong>{applicationToWithdraw?.jobTitle}</strong>?
              This action cannot be undone.
            </Text>
            <div className="flex gap-3">
              <Button onClick={() => setWithdrawConfirmOpen(false)} variant="light" fullWidth>
                Cancel
              </Button>
              <Button onClick={withdrawApplication} color="red" fullWidth>
                Withdraw
              </Button>
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default MyApplicationsPage;