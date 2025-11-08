import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import FileUpload from './FileUpload';

const API_URL = import.meta.env.VITE_API_URL;

const EnhancedAIAnalysis = ({ businessDetails, description, currentFunding, cibilScore, escrowTransactions }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);

  const fetchAIAnalysis = async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    setShowAnalysis(true);

    try {
      let prompt = `
        Analyze the following business idea and provide a business analysis score (0-100) and a detailed pointwise report. Structure your response as follows:
        - Business Analysis Score: [score]/100
        - Analysis:
          - [Point 1]
          - [Point 2]
          - [Point 3]
          - [Add more points as needed]

        Business Idea Details:
        - Title: ${businessDetails.title}
        - Description: ${description}
        - Funding Goal: $${businessDetails.fundingGoal}
        - Equity Offered: ${businessDetails.equityOffered}%
        - Current Funding: $${currentFunding}
        - CIBIL Score: ${cibilScore}
        - Escrow Transactions: ${JSON.stringify(escrowTransactions)}

        Consider market potential, financial viability, creditworthiness (based on CIBIL score), funding progress, and escrow status when generating the score and report.
      `;

      // Add file context if files are uploaded
      if (uploadedFiles.length > 0) {
        prompt += `\n\nAdditionally, analyze the ${uploadedFiles.length} attached file(s) in context of this business:`;
        uploadedFiles.forEach((file, index) => {
          if (file.type.startsWith('image/')) {
            prompt += `\n- Image ${index + 1} (${file.name}): Analyze visual elements, products, prototypes, or business materials shown`;
          } else if (file.type.startsWith('video/')) {
            prompt += `\n- Video ${index + 1} (${file.name}): Analyze demonstrations, presentations, or business operations shown`;
          } else if (file.type === 'application/pdf') {
            prompt += `\n- PDF ${index + 1} (${file.name}): Analyze business plans, financial documents, or market research provided`;
          }
        });
        prompt += '\n\nIncorporate insights from these files into your overall business assessment.';
      }

      const requestBody = {
        prompt,
        files: uploadedFiles.length > 0 ? uploadedFiles : undefined
      };

      const response = await fetch(`${API_URL}/ai-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch AI analysis');
      }

      const result = await response.json();
      const cleanedReport = result.report.map(point => point.replace(/\*\*/g, '').trim());
      setAnalysisResult({ ...result, report: cleanedReport });
    } catch (err) {
      setAnalysisError(err.message);
      console.error('AI Analysis error:', err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
  };

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };

  return (
    <div className="space-y-4">
      {/* Main AI Analysis Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={fetchAIAnalysis}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          disabled={analysisLoading}
        >
          <Brain className="w-5 h-5" />
          <span>{analysisLoading ? 'Analyzing...' : 'AI Analysis'}</span>
        </button>

        {/* Toggle File Upload Button */}
        <button
          onClick={toggleFileUpload}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <span>Add Files</span>
          {uploadedFiles.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {uploadedFiles.length}
            </span>
          )}
        </button>
      </div>

      {/* File Upload Section */}
      {showFileUpload && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Upload files to enhance your business analysis
          </h4>
          <FileUpload onFilesChange={handleFilesChange} maxFiles={5} />
          <p className="text-xs text-gray-500 mt-2">
            Tip: Upload business plans (PDF), product images, demo videos, or market research documents for a more comprehensive analysis.
          </p>
        </div>
      )}

      {/* AI Analysis Result */}
      {showAnalysis && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg text-gray-800">AI Business Analysis</h3>
            {uploadedFiles.length > 0 && (
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                + {uploadedFiles.length} file(s) analyzed
              </span>
            )}
          </div>

          {analysisLoading ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mr-3"></div>
                <span className="text-gray-600">
                  {uploadedFiles.length > 0 
                    ? 'Analyzing business details and uploaded files...' 
                    : 'Analyzing business details...'}
                </span>
              </div>
            </div>
          ) : analysisError ? (
            <div>
              <p className="text-red-600">Error: {analysisError}</p>
              {analysisError.includes('Rate limit exceeded') && (
                <button
                  onClick={fetchAIAnalysis}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Try Again
                </button>
              )}
              {analysisError.includes('validation failed') && (
                <p className="text-sm text-gray-600 mt-2">
                  The AI couldn't provide a complete analysis. Please try with more detailed information or different files.
                </p>
              )}
            </div>
          ) : analysisResult ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-medium text-gray-900">
                  Business Analysis Score: {analysisResult.score}/100
                </p>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  analysisResult.score >= 80 ? 'bg-green-100 text-green-800' :
                  analysisResult.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  analysisResult.score >= 40 ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {analysisResult.score >= 80 ? 'Excellent' :
                   analysisResult.score >= 60 ? 'Good' :
                   analysisResult.score >= 40 ? 'Fair' : 'Poor'}
                </div>
              </div>
              
              {analysisResult.score === 0 && (
                <p className="text-sm text-yellow-600 mb-2">
                  Warning: Score is 0. The AI might need more data for an accurate analysis.
                </p>
              )}
              
              <ul className="space-y-2 text-gray-700">
                {analysisResult.report.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2 shrink-0"></span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">No analysis available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedAIAnalysis;