import React from 'react';

function BasicCompanyInfo({ formData, setFormData, loading }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddressChange = (field, value) => {
    setFormData({
      ...formData,
      registeredOfficeAddress: {
        ...formData.registeredOfficeAddress,
        [field]: value
      }
    });
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData({
      ...formData,
      socialMediaLinks: {
        ...formData.socialMediaLinks,
        [platform]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 1: Basic Company Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={formData.companyName || ''}
            onChange={(e) => handleChange('companyName', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Registration Number (CIN/GSTIN) *
          </label>
          <input
            type="text"
            value={formData.companyRegistrationNumber || ''}
            onChange={(e) => handleChange('companyRegistrationNumber', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter CIN/GSTIN"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Incorporation *
          </label>
          <input
            type="date"
            value={formData.dateOfIncorporation || ''}
            onChange={(e) => handleChange('dateOfIncorporation', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Company *
          </label>
          <select
            value={formData.typeOfCompany || ''}
            onChange={(e) => handleChange('typeOfCompany', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value="">Select company type</option>
            <option value="Private Ltd">Private Ltd</option>
            <option value="LLP">LLP</option>
            <option value="Partnership">Partnership</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry/Sector *
          </label>
          <select
            value={formData.industrySector || ''}
            onChange={(e) => handleChange('industrySector', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value="">Select industry/sector</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Financial Services">Financial Services</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Education">Education</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Energy">Energy</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Website URL
          </label>
          <input
            type="url"
            value={formData.companyWebsite || ''}
            onChange={(e) => handleChange('companyWebsite', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Registered Office Address *</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.addressLine1 || ''}
              onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street address"
              required
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.addressLine2 || ''}
              onChange={(e) => handleAddressChange('addressLine2', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apartment, suite, etc."
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.city || ''}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.state || ''}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="State"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.pinCode || ''}
              onChange={(e) => handleAddressChange('pinCode', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="PIN Code"
              required
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Social Media Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.socialMediaLinks?.linkedin || ''}
              onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="LinkedIn URL"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter
            </label>
            <input
              type="url"
              value={formData.socialMediaLinks?.twitter || ''}
              onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Twitter URL"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook
            </label>
            <input
              type="url"
              value={formData.socialMediaLinks?.facebook || ''}
              onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Facebook URL"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicCompanyInfo;