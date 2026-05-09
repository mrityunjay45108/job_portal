// src/services/resumeAnalyzer.ts
import api from './api';

export interface ResumeAnalysisResult {
  jdMatch: string;
  missingKeywords: string[];
  profileSummary: string;
  score: number;
}

class ResumeAnalyzerService {
  private analyzerUrl: string;

  constructor() {
    this.analyzerUrl = process.env.REACT_APP_RESUME_ANALYZER_URL || 'http://localhost:8501';
  }

  // Open Resume Analyzer in new tab
  openAnalyzer() {
    window.open(this.analyzerUrl, '_blank');
  }

  // Get iframe URL for embedding
  getIframeUrl() {
    return this.analyzerUrl;
  }

  // Check if analyzer is running
  async isAnalyzerRunning(): Promise<boolean> {
    try {
      const response = await fetch(`${this.analyzerUrl}/_stcore/health`, {
        method: 'GET',
        mode: 'no-cors'
      });
      return true;
    } catch {
      return false;
    }
  }
}

export default new ResumeAnalyzerService();