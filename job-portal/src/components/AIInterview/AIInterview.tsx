// src/components/AIInterview/AIInterview.tsx
import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Textarea,
  Card,
  Badge,
  Progress,
  Stepper,
  Timeline,
  RingProgress
} from "@mantine/core";
import {
  IconBrain,
  IconMicrophone,
  IconSend,
  IconCheck,
  IconScoreboard,
  IconBulb,
  IconArrowRight
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

interface Question {
  question: string;
  type: string;
  difficulty: string;
  expectedKeywords: string[];
}

interface AnswerAnalysis {
  score: number;
  feedback: string;
  missingKeywords: string[];
  improvement: string;
}

const AIInterview = ({ jobId, onComplete }: { jobId: string; onComplete?: () => void }) => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null);
  const [allAnalyses, setAllAnalyses] = useState<AnswerAnalysis[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentAnswer(transcript);
        setIsRecording(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsRecording(false);
        notifications.show({
          title: "Error",
          message: "Could not recognize speech. Please type your answer.",
          color: "red"
        });
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await api.post('/interviews/generate-questions', {
        jobId,
        experience: user?.profile?.experience || "Not specified",
        skills: user?.profile?.skills?.join(', ') || ""
      });
      
      if (response.data.success) {
        setQuestions(response.data.questions);
        setActiveStep(1);
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to generate questions",
        color: "red"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) {
      notifications.show({
        title: "Warning",
        message: "Please provide an answer",
        color: "yellow"
      });
      return;
    }

    setLoading(true);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const response = await api.post('/interviews/analyze-answer', {
        question: currentQuestion.question,
        answer: currentAnswer,
        expectedKeywords: currentQuestion.expectedKeywords
      });
      
      if (response.data.success) {
        const analysisResult = response.data.analysis;
        setAnalysis(analysisResult);
        setAllAnalyses([...allAnalyses, analysisResult]);
        setAnswers([...answers, currentAnswer]);
        setCurrentAnswer("");
        
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnalysis(null);
        } else {
          setShowResults(true);
          setActiveStep(2);
          if (onComplete) onComplete();
        }
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to analyze answer",
        color: "red"
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalScore = () => {
    if (allAnalyses.length === 0) return 0;
    const total = allAnalyses.reduce((sum, a) => sum + a.score, 0);
    return Math.round(total / allAnalyses.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "green";
    if (score >= 60) return "yellow";
    return "red";
  };

  const totalScore = calculateTotalScore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <Container size="lg">
        <Paper className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <IconBrain size={28} />
              <Title order={2} className="text-white">AI-Powered Interview</Title>
            </div>
            <Text className="text-indigo-100">
              Practice with our AI interviewer and get real-time feedback
            </Text>
          </div>

          <div className="p-6">
            <Stepper active={activeStep} className="mb-8">
              <Stepper.Step label="Generate" description="AI creates questions" />
              <Stepper.Step label="Interview" description="Answer questions" />
              <Stepper.Step label="Results" description="Get feedback" />
            </Stepper>

            {/* Step 1: Generate Questions */}
            {activeStep === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconBrain size={48} className="text-indigo-600" />
                </div>
                <Title order={3} className="mb-3">AI Interview Preparation</Title>
                <Text className="text-gray-500 mb-6 max-w-md mx-auto">
                  Our AI will generate personalized interview questions based on the job requirements and your profile.
                </Text>
                <Button
                  onClick={generateQuestions}
                  loading={loading}
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700"
                  rightSection={<IconArrowRight size={18} />}
                >
                  Start AI Interview
                </Button>
              </div>
            )}

            {/* Step 2: Interview Questions */}
            {activeStep === 1 && !showResults && questions.length > 0 && (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge size="lg" color="indigo">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                    <Badge color={questions[currentQuestionIndex]?.difficulty === 'hard' ? 'red' : 'blue'}>
                      {questions[currentQuestionIndex]?.difficulty?.toUpperCase()} Difficulty
                    </Badge>
                  </div>
                  <Card className="bg-indigo-50 border border-indigo-200">
                    <Text size="lg" fw={600} className="text-gray-800">
                      {questions[currentQuestionIndex]?.question}
                    </Text>
                  </Card>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <Text fw={500}>Your Answer</Text>
                    {recognition && (
                      <Button
                        size="xs"
                        variant={isRecording ? "filled" : "light"}
                        color={isRecording ? "red" : "blue"}
                        leftSection={<IconMicrophone size={14} />}
                        onClick={startRecording}
                      >
                        {isRecording ? "Recording..." : "Speak Answer"}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    placeholder="Type or speak your answer here..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    minRows={5}
                    className="mb-4"
                  />
                  <Button
                    onClick={submitAnswer}
                    loading={loading}
                    fullWidth
                    size="lg"
                    className="bg-indigo-600"
                    rightSection={<IconSend size={18} />}
                  >
                    Submit Answer
                  </Button>
                </div>

                {/* Real-time Analysis */}
                {analysis && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <Text fw={600} className="mb-3 flex items-center gap-2">
                      <IconScoreboard size={18} className="text-indigo-600" />
                      AI Analysis
                    </Text>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score</span>
                          <span className="font-bold">{analysis.score}%</span>
                        </div>
                        <Progress value={analysis.score} color={getScoreColor(analysis.score)} size="md" />
                      </div>
                      <Text size="sm" className="text-gray-600">{analysis.feedback}</Text>
                      {analysis.missingKeywords.length > 0 && (
                        <div>
                          <Text size="xs" className="text-gray-500 mb-1">Missing Keywords:</Text>
                          <div className="flex flex-wrap gap-1">
                            {analysis.missingKeywords.map((kw, i) => (
                              <Badge key={i} size="sm" color="yellow">{kw}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Results */}
            {activeStep === 2 && showResults && (
              <div>
                <div className="text-center mb-8">
                  <RingProgress
                    size={120}
                    thickness={8}
                    sections={[{ value: totalScore, color: getScoreColor(totalScore) }]}
                    label={
                      <Text size="xl" fw={800} className="text-center">
                        {totalScore}%
                      </Text>
                    }
                  />
                  <Title order={3} className="mt-4">Interview Complete!</Title>
                  <Text className="text-gray-500">Overall Score: {totalScore}%</Text>
                </div>

                <Timeline active={1} bulletSize={24} lineWidth={2}>
                  {questions.map((q, idx) => (
                    <Timeline.Item
                      key={idx}
                      bullet={<IconCheck size={12} />}
                      title={q.question.substring(0, 60) + "..."}
                    >
                      <Text size="sm" className="mb-2">
                        Score: {allAnalyses[idx]?.score}%
                      </Text>
                      <Text size="xs" className="text-gray-500">
                        {allAnalyses[idx]?.feedback?.substring(0, 100)}...
                      </Text>
                    </Timeline.Item>
                  ))}
                </Timeline>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <IconBulb size={18} className="text-green-600" />
                    <Text fw={600}>Improvement Suggestions</Text>
                  </div>
                  <ul className="space-y-1">
                    {allAnalyses.map((a, i) => (
                      <li key={i} className="text-sm text-gray-600">
                        • {a.improvement?.substring(0, 80)}...
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  fullWidth
                  size="lg"
                  className="mt-6 bg-indigo-600"
                  onClick={() => window.location.reload()}
                >
                  Practice Again
                </Button>
              </div>
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default AIInterview;