import React from 'react';

function BusinessModel({ formData, setFormData, loading, handleFileChange }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDemoLinksChange = (index, value) => {
    const updatedLinks = [...(formData.demoPrototypeLinks || [])];
    updatedLinks[index] = value;
    setFormData({ ...formData, demoPrototypeLinks: updatedLinks });
  };

  const addDemoLink = () => {
    const updatedLinks = [...(formData.demoPrototypeLinks || []), ''];
    setFormData({ ...formData, demoPrototypeLinks: updatedLinks });
  };

  const removeDemoLink = (index) => {
    const updatedLinks = formData.demoPrototypeLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, demoPrototypeLinks: updatedLinks });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 3: Business Model & Product</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Elevator Pitch (150 words max) *
        </label>
        <textarea
          value={formData.elevatorPitch || ''}
          onChange={(e) => handleChange('elevatorPitch', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Brief description of your business in 150 words or less"
          maxLength={150}
          required
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">
          {(formData.elevatorPitch || '').length}/150 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detailed Business Description *
        </label>
        <textarea
          value={formData.detailedBusinessDescription || ''}
          onChange={(e) => handleChange('detailedBusinessDescription', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="Provide a comprehensive description of your business"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Problem Solved *
        </label>
        <textarea
          value={formData.problemSolved || ''}
          onChange={(e) => handleChange('problemSolved', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="What problem does your business solve?"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Market and Customer Segments *
        </label>
        <textarea
          value={formData.targetMarket || ''}
          onChange={(e) => handleChange('targetMarket', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Describe your target market and customer segments"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Revenue Model and Pricing *
        </label>
        <textarea
          value={formData.revenueModel || ''}
          onChange={(e) => handleChange('revenueModel', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Explain your revenue model and pricing strategy"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Competitive Landscape *
        </label>
        <textarea
          value={formData.competitiveLandscape || ''}
          onChange={(e) => handleChange('competitiveLandscape', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Describe your competitive landscape and advantages"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product/Service Description *
        </label>
        <textarea
          value={formData.productServiceDescription || ''}
          onChange={(e) => handleChange('productServiceDescription', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="Provide detailed description of your product or service"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Product Images (Max 5 files - JPEG/PNG)
        </label>
        <input
          type="file"
          name="productImages"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".jpg,.jpeg,.png"
          multiple
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Max 5 files, JPEG/PNG format</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Pitch Video (Max 2 files, 5 mins each - MP4)
        </label>
        <input
          type="file"
          name="pitchVideos"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".mp4"
          multiple
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Max 2 files, MP4 format, 5 minutes each</p>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Demo/Prototype Links</h4>
        {(formData.demoPrototypeLinks || []).map((link, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              value={link}
              onChange={(e) => handleDemoLinksChange(index, e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter demo/prototype URL"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => removeDemoLink(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={loading}
            >
              Remove
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addDemoLink}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          Add Demo Link
        </button>
      </div>
    </div>
  );
}

export default BusinessModel;