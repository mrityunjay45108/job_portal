// src/Pages/ResumeAnalyzerPage.tsx
import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Alert,
  Loader,
  Tabs,
  Card,
  Badge,
} from '@mantine/core';
import {
  IconBrain,
  IconExternalLink,
  IconCheck,
  IconAlertCircle,
  IconSparkles,
  IconShield,
} from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ResumeAnalyzerPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isAnalyzerRunning, setIsAnalyzerRunning] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const analyzerUrl = process.env.REACT_APP_RESUME_ANALYZER_URL || 'http://localhost:8501';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'candidate') {
      navigate('/');
      return;
    }

    checkAnalyzerStatus();
  }, [isAuthenticated, user, navigate]);

  const checkAnalyzerStatus = async () => {
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      await fetch(analyzerUrl, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors'
      });
      
      clearTimeout(timeoutId);
      setIsAnalyzerRunning(true);
    } catch (error) {
      setIsAnalyzerRunning(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="min-h-screen flex items-center justify-center py-20">
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <Container size="xl" className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <IconBrain size={24} className="text-white" />
              </div>
              <div>
                <Title order={1} className="text-xl font-bold text-gray-900">
                  AI Resume Analyzer
                </Title>
                <Text size="xs" className="text-gray-500">
                  Optimize your resume with AI-powered ATS analysis
                </Text>
              </div>
            </div>
            {isAnalyzerRunning && (
              <Button
                size="sm"
                variant="outline"
                rightSection={<IconExternalLink size={16} />}
                onClick={() => window.open(analyzerUrl, '_blank')}
              >
                Open in New Tab
              </Button>
            )}
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-6">
        {isAnalyzerRunning === false && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Resume Analyzer Not Running"
            color="yellow"
            className="mb-6"
          >
            <Text size="sm" className="mb-3">
              The AI Resume Analyzer is not currently running. Please start it using:
            </Text>
            <Paper className="bg-gray-900 text-white p-3 rounded-lg mb-3">
              <code className="text-sm">
                cd resume-analyzer && python -m streamlit run app.py --server.port 8501
              </code>
            </Paper>
          </Alert>
        )}

        {isAnalyzerRunning === true && (
          <>
            <Alert
              icon={<IconCheck size={16} />}
              title="Resume Analyzer is Ready!"
              color="green"
              className="mb-4"
            >
              <Text size="sm">
                The AI Resume Analyzer is running. Use the tool below to analyze your resume.
              </Text>
            </Alert>

            {/* ✅ Embed Streamlit app in iframe - stays inside React app */}
            <Paper className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <iframe
                src={analyzerUrl}
                title="Resume Analyzer"
                className="w-full"
                style={{ height: 'calc(100vh - 200px)', minHeight: '600px', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
              />
            </Paper>
          </>
        )}

        {/* Tips Section */}
        {isAnalyzerRunning === true && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <IconSparkles size={18} className="text-blue-600" />
                <Text fw={600}>Pro Tip 1</Text>
              </div>
              <Text size="sm" className="text-gray-600">
                Copy the complete job description for better analysis
              </Text>
            </Card>
            <Card className="bg-purple-50 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <IconShield size={18} className="text-purple-600" />
                <Text fw={600}>Pro Tip 2</Text>
              </div>
              <Text size="sm" className="text-gray-600">
                Use PDF format for best text extraction
              </Text>
            </Card>
            <Card className="bg-green-50 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <IconCheck size={18} className="text-green-600" />
                <Text fw={600}>Pro Tip 3</Text>
              </div>
              <Text size="sm" className="text-gray-600">
                Add missing keywords to improve your ATS score
              </Text>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ResumeAnalyzerPage;