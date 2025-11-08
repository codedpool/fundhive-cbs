import React from 'react';

function AdditionalData({ formData, setFormData, loading, handleFileChange }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFollowersChange = (platform, value) => {
    setFormData({
      ...formData,
      socialMediaFollowersCount: {
        ...formData.socialMediaFollowersCount,
        [platform]: value
      }
    });
  };

  const handlePressMentionsChange = (index, value) => {
    const updatedMentions = [...(formData.pressMentionUrls || [])];
    updatedMentions[index] = value;
    setFormData({ ...formData, pressMentionUrls: updatedMentions });
  };

  const addPressMention = () => {
    const updatedMentions = [...(formData.pressMentionUrls || []), ''];
    setFormData({ ...formData, pressMentionUrls: updatedMentions });
  };

  const removePressMention = (index) => {
    const updatedMentions = formData.pressMentionUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, pressMentionUrls: updatedMentions });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 8: AI & Additional Data</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">AI Credit Scoring</h4>
        <p className="text-sm text-blue-700">
          The information provided in this section will be used by our AI system to evaluate 
          your business's credibility, market presence, and growth potential. This helps us 
          provide better investment recommendations to our users.
        </p>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Press Mentions and Media Coverage</h4>
        {(formData.pressMentionUrls || []).map((url, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              value={url}
              onChange={(e) => handlePressMentionsChange(index, e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter URL for press mention or media coverage"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => removePressMention(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={loading}
            >
              Remove
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addPressMention}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          Add Press Mention URL
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Customer Testimonials or Case Studies (PDF/Image)
        </label>
        <input
          type="file"
          name="customerTestimonials"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Optional: PDF, JPG, PNG format, max 5 files</p>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Social Media Followers Count</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn Followers
            </label>
            <input
              type="number"
              value={formData.socialMediaFollowersCount?.linkedin || ''}
              onChange={(e) => handleFollowersChange('linkedin', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter LinkedIn followers count"
              min="0"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter Followers
            </label>
            <input
              type="number"
              value={formData.socialMediaFollowersCount?.twitter || ''}
              onChange={(e) => handleFollowersChange('twitter', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Twitter followers count"
              min="0"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Followers
            </label>
            <input
              type="number"
              value={formData.socialMediaFollowersCount?.instagram || ''}
              onChange={(e) => handleFollowersChange('instagram', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Instagram followers count"
              min="0"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">Why This Information Matters</h4>
        <ul className="text-sm text-green-700 list-disc list-inside space-y-1">
          <li><strong>Press Mentions:</strong> Demonstrate market recognition and credibility</li>
          <li><strong>Customer Testimonials:</strong> Show product-market fit and customer satisfaction</li>
          <li><strong>Social Media Presence:</strong> Indicate brand awareness and customer engagement</li>
          <li><strong>AI Analysis:</strong> Helps investors understand your market position and growth potential</li>
        </ul>
      </div>
    </div>
  );
}

export default AdditionalData;