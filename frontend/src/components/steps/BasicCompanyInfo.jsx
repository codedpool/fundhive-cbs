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
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Company Information</h3>
        <p className="text-gray-600">Let's start with the essential details about your company</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.companyName || ''}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your company name"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Company Registration Number (CIN/GSTIN) *
            </label>
            <input
              type="text"
              value={formData.companyRegistrationNumber || ''}
              onChange={(e) => handleChange('companyRegistrationNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter CIN/GSTIN number"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Date of Incorporation *
            </label>
            <input
              type="date"
              value={formData.dateOfIncorporation || ''}
              onChange={(e) => handleChange('dateOfIncorporation', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Type of Company *
            </label>
            <select
              value={formData.typeOfCompany || ''}
              onChange={(e) => handleChange('typeOfCompany', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Industry/Sector *
            </label>
            <select
              value={formData.industrySector || ''}
              onChange={(e) => handleChange('industrySector', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Company Website URL
            </label>
            <input
              type="url"
              value={formData.companyWebsite || ''}
              onChange={(e) => handleChange('companyWebsite', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://example.com"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          Registered Office Address *
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Address Line 1 *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.addressLine1 || ''}
              onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Street address"
              required
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Address Line 2
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.addressLine2 || ''}
              onChange={(e) => handleAddressChange('addressLine2', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Apartment, suite, etc."
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              City *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.city || ''}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="City"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              State *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.state || ''}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="State"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              PIN Code *
            </label>
            <input
              type="text"
              value={formData.registeredOfficeAddress?.pinCode || ''}
              onChange={(e) => handleAddressChange('pinCode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="PIN Code"
              required
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          Social Media Links
        </h4>
        <p className="text-sm text-gray-600 mb-4">Help investors learn more about your company's online presence</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.socialMediaLinks?.linkedin || ''}
              onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="LinkedIn company page URL"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Twitter
            </label>
            <input
              type="url"
              value={formData.socialMediaLinks?.twitter || ''}
              onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Twitter profile URL"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Facebook
            </label>
            <input
              type="url"
              value={formData.socialMediaLinks?.facebook || ''}
              onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Facebook page URL"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicCompanyInfo;