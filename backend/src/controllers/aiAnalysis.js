const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// OpenAI SDK configured to use OpenRouter API
// Ensure OPENROUTER_API_KEY is set in your .env file
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://fundhive.app', // Optional. Site URL for rankings on openrouter.ai.
    'X-Title': 'FundHive', // Optional. Site title for rankings on openrouter.ai.
  },
});

// Utility function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Supported file types and their MIME types
const SUPPORTED_FILE_TYPES = {
  images: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  videos: ['video/mp4', 'video/mpeg', 'video/mov', 'video/webm'],
  pdfs: ['application/pdf']
};

// File size limits (in bytes)
const FILE_SIZE_LIMITS = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  pdf: 50 * 1024 * 1024 // 50MB
};

// Validate and process uploaded files
async function validateAndProcessFiles(files) {
  const processedFiles = [];
  
  if (files.length > 5) {
    throw new Error('Maximum 5 files allowed per request');
  }

  for (const file of files) {
    const { type, data, filename } = file;
    
    // Validate file type
    const fileCategory = getFileCategory(type);
    if (!fileCategory) {
      throw new Error(`Unsupported file type: ${type}`);
    }

    // Validate file size
    const sizeLimit = FILE_SIZE_LIMITS[fileCategory];
    if (data.length > sizeLimit) {
      throw new Error(`File ${filename} exceeds size limit of ${Math.round(sizeLimit / 1024 / 1024)}MB`);
    }

    // Process based on file type
    let contentItem;
    if (fileCategory === 'image') {
      contentItem = {
        type: 'image_url',
        image_url: {
          url: `data:${type};base64,${data}`
        }
      };
    } else if (fileCategory === 'video') {
      contentItem = {
        type: 'input_video',
        video_url: {
          url: `data:${type};base64,${data}`
        }
      };
    } else if (fileCategory === 'pdf') {
      contentItem = {
        type: 'file',
        file: {
          filename: filename || 'document.pdf',
          file_data: `data:${type};base64,${data}`
        }
      };
    }

    processedFiles.push(contentItem);
  }

  return processedFiles;
}

// Helper function to categorize file types
function getFileCategory(mimeType) {
  if (SUPPORTED_FILE_TYPES.images.includes(mimeType)) return 'image';
  if (SUPPORTED_FILE_TYPES.videos.includes(mimeType)) return 'video';
  if (SUPPORTED_FILE_TYPES.pdfs.includes(mimeType)) return 'pdf';
  return null;
}

async function aiAnalysis(req, res) {
  try {
    const { prompt, files } = req.body; // Added files parameter

    // Stricter input validation
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const promptStr = String(prompt).trim();
    if (promptStr.length < 20) {
      return res.status(400).json({ message: 'Prompt must be at least 20 characters long' });
    }

    if (promptStr.length > 5000) {
      return res.status(400).json({ message: 'Prompt must not exceed 5000 characters' });
    }

    // Check for minimum word count
    const wordCount = promptStr.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 5) {
      return res.status(400).json({ message: 'Prompt must contain at least 5 words' });
    }

    // Validate files if provided
    let processedFiles = [];
    if (files && Array.isArray(files)) {
      processedFiles = await validateAndProcessFiles(files);
    }

    const fetchAnalysis = async (retryCount = 0, maxRetries = 3) => {
      try {
        // Enhanced system prompt with multimodal support
        const systemPrompt = `You are a professional business analysis AI with multimodal capabilities. Analyze the provided business description and any attached files (images, videos, PDFs) with strict criteria and provide a structured response with:
1. A "Business Analysis Score:" (0-100) based on viability, market potential, and feasibility
2. An "Analysis:" section with exactly 4-6 bullet points starting with "-"

Requirements:
- Be critical and realistic in your assessment
- Score must reflect genuine business potential, not optimism bias
- Each analysis point must be specific and actionable
- Consider market viability, scalability, and risks
- Provide balanced positive and critical insights
- If files are provided, analyze them in context of the business description
- For images: analyze visual elements, products, prototypes, or business materials
- For videos: analyze demonstrations, presentations, or business operations
- For PDFs: analyze business plans, financial documents, or market research

Example format:
Business Analysis Score: 65
Analysis:
- Clear market demand with competitive advantage in pricing
- Scalable technology infrastructure required but feasible
- Limited initial capital may hinder rapid expansion
- Strong founding team experience in logistics
- Regulatory compliance issues need immediate attention
- Revenue model shows promising unit economics`;

        // Build messages array with text and files
        const messageContent = [
          {
            type: 'text',
            text: promptStr
          },
          ...processedFiles
        ];

        // Add PDF plugin configuration if PDFs are present
        let plugins = [];
        const hasPDF = processedFiles.some(file => file.type === 'file');
        if (hasPDF) {
          plugins.push({
            id: 'file-parser',
            pdf: {
              engine: 'pdf-text' // Use free text extraction
            }
          });
        }

        const requestBody = {
          model: 'google/gemini-2.0-flash-001', // Updated to support multimodal
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: messageContent }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 0.95,
          stream: false,
          stop: null,
        };

        // Add plugins if needed
        if (plugins.length > 0) {
          requestBody.plugins = plugins;
        }

        const chatCompletion = await openai.chat.completions.create(requestBody);

        const rawResponse = chatCompletion.choices[0].message.content;
        console.log('Raw AI Response:', rawResponse); // Debug logging

        // Parse the structured response with stricter validation
        const lines = rawResponse.split('\n').map(line => line.trim()).filter(line => line);
        let score = null;
        let report = [];
        let inAnalysisSection = false;
        let analysisStartIndex = -1;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('Business Analysis Score:')) {
            const scoreMatch = line.match(/Business Analysis Score:\s*(\d+)/);
            if (scoreMatch) {
              const parsedScore = parseInt(scoreMatch[1], 10);
              if (parsedScore < 0 || parsedScore > 100) {
                throw new Error('Invalid score received from AI: must be 0-100');
              }
              score = parsedScore;
            } else {
              throw new Error('Invalid score format in AI response');
            }
          } else if (line.startsWith('Analysis:')) {
            inAnalysisSection = true;
            analysisStartIndex = i + 1;
          } else if (inAnalysisSection && line.startsWith('-')) {
            const analysisPoint = line.replace('-', '').trim();
            if (analysisPoint.length > 10) {
              report.push(analysisPoint);
            }
          }
        }

        // Strict validation of response
        if (score === null) {
          throw new Error('Business Analysis Score not found in AI response');
        }

        if (!inAnalysisSection) {
          throw new Error('Analysis section not found in AI response');
        }

        if (report.length < 4) {
          throw new Error(`Insufficient analysis provided. Expected at least 4 points, got ${report.length}`);
        }

        if (report.length > 6) {
          // Trim to 6 points if more are provided
          report = report.slice(0, 6);
        }

        return { score, report };
      } catch (error) {
        // OpenRouter rate limiting detection
        const isRateLimit = error?.status === 429 || 
                           error?.response?.status === 429 || 
                           /rate limit/i.test(error?.message || '');
        
        if (isRateLimit && retryCount < maxRetries) {
          const retryAfter = error?.response?.headers?.['retry-after'] || 
                           error?.headers?.['retry-after'] || 7;
          console.log(`Rate limit hit, retrying in ${retryAfter} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
          await delay(parseFloat(retryAfter) * 1000);
          return fetchAnalysis(retryCount + 1, maxRetries);
        }

        // Log validation errors with details
        if (error?.message?.includes('Analysis') || error?.message?.includes('Score')) {
          console.error('Validation error in AI response:', error.message);
        }

        throw error; // Re-throw if not a rate limit error or max retries reached
      }
    };

    const result = await fetchAnalysis();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching AI analysis:', error);
    const isRateLimit = error?.status === 429 || 
                       error?.response?.status === 429 || 
                       /rate limit/i.test(error?.message || '');
    
    if (isRateLimit) {
      res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
    } else if (error?.message?.includes('Prompt must') || 
               error?.message?.includes('Invalid')) {
      // Client validation errors
      res.status(400).json({ message: error.message });
    } else if (error?.message?.includes('not found') || 
               error?.message?.includes('Insufficient')) {
      // AI response validation errors
      res.status(400).json({ message: `Analysis validation failed: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = aiAnalysis;