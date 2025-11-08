// Test script for multimodal AI analysis API
// Run with: node test-multimodal-api.js

const API_URL = 'http://localhost:5000'; // Adjust based on your backend URL

async function testBasicAnalysis() {
  console.log('Testing basic text analysis...');
  
  try {
    const response = await fetch(`${API_URL}/ai-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'I am developing a mobile app for food delivery in urban areas. The app connects local restaurants with customers and offers real-time tracking. I need $50,000 to expand to new cities.'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch analysis');
    }

    const result = await response.json();
    console.log('✅ Basic analysis successful:');
    console.log(`Score: ${result.score}/100`);
    console.log('Analysis points:', result.report.length);
    console.log('First point:', result.report[0]);
  } catch (error) {
    console.error('❌ Basic analysis failed:', error.message);
  }
}

async function testWithFiles() {
  console.log('\nTesting analysis with mock file data...');
  
  // Mock base64 data for a small image (1x1 pixel PNG)
  const mockImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  
  try {
    const response = await fetch(`${API_URL}/ai-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'I am developing a mobile app for food delivery. Here is my business plan and prototype mockup.',
        files: [
          {
            name: 'prototype.png',
            type: 'image/png',
            size: 1024,
            data: mockImageBase64,
            filename: 'prototype.png'
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch analysis');
    }

    const result = await response.json();
    console.log('✅ Multimodal analysis successful:');
    console.log(`Score: ${result.score}/100`);
    console.log('Analysis points:', result.report.length);
    console.log('First point:', result.report[0]);
  } catch (error) {
    console.error('❌ Multimodal analysis failed:', error.message);
  }
}

async function testValidation() {
  console.log('\nTesting input validation...');
  
  // Test short prompt
  try {
    const response = await fetch(`${API_URL}/ai-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'short'
      }),
    });

    if (response.status === 400) {
      const errorData = await response.json();
      console.log('✅ Short prompt validation working:', errorData.message);
    } else {
      console.log('❌ Short prompt validation failed');
    }
  } catch (error) {
    console.error('❌ Validation test error:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🧪 Testing Multimodal AI Analysis API\n');
  
  await testBasicAnalysis();
  await testWithFiles();
  await testValidation();
  
  console.log('\n✨ Tests completed!');
}

// Check if running directly
if (typeof module !== 'undefined' && require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testBasicAnalysis, testWithFiles, testValidation };