import React from 'react';

function FounderDetails({ formData, setFormData, loading, handleFileChange }) {
  const handleFounderChange = (index, field, value) => {
    const updatedFounders = [...(formData.founders || [])];
    if (!updatedFounders[index]) {
      updatedFounders[index] = {};
    }
    updatedFounders[index][field] = value;
    setFormData({ ...formData, founders: updatedFounders });
  };

  const addFounder = () => {
    const updatedFounders = [...(formData.founders || []), {
      fullName: '',
      email: '',
      phoneNumber: '',
      linkedinProfile: ''
    }];
    setFormData({ ...formData, founders: updatedFounders });
  };

  const removeFounder = (index) => {
    const updatedFounders = formData.founders.filter((_, i) => i !== index);
    setFormData({ ...formData, founders: updatedFounders });
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...(formData.keyTeamMembers || [])];
    if (!updatedTeamMembers[index]) {
      updatedTeamMembers[index] = {};
    }
    updatedTeamMembers[index][field] = value;
    setFormData({ ...formData, keyTeamMembers: updatedTeamMembers });
  };

  const addTeamMember = () => {
    const updatedTeamMembers = [...(formData.keyTeamMembers || []), {
      name: '',
      role: ''
    }];
    setFormData({ ...formData, keyTeamMembers: updatedTeamMembers });
  };

  const removeTeamMember = (index) => {
    const updatedTeamMembers = formData.keyTeamMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, keyTeamMembers: updatedTeamMembers });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Founder and Team Details</h3>
        <p className="text-gray-600">Tell us about the people behind your company</p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
          Founder Details *
        </h4>
        {(formData.founders || [{}]).map((founder, index) => (
          <div key={index} className="bg-white p-6 rounded-lg mb-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-semibold text-gray-800 text-lg">Founder {index + 1}</h5>
              {formData.founders && formData.founders.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFounder(index)}
                  className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
                  disabled={loading}
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={founder.fullName || ''}
                  onChange={(e) => handleFounderChange(index, 'fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter full name"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  value={founder.email || ''}
                  onChange={(e) => handleFounderChange(index, 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter email address"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={founder.phoneNumber || ''}
                  onChange={(e) => handleFounderChange(index, 'phoneNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter phone number"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  LinkedIn Profile *
                </label>
                <input
                  type="url"
                  value={founder.linkedinProfile || ''}
                  onChange={(e) => handleFounderChange(index, 'linkedinProfile', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="LinkedIn profile URL"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addFounder}
          className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          + Add Another Founder
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          Key Team Members
        </h4>
        <p className="text-sm text-gray-600 mb-4">Add key team members who play important roles in your company</p>
        
        {(formData.keyTeamMembers || []).map((member, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h5 className="font-semibold text-gray-700">Team Member {index + 1}</h5>
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
                disabled={loading}
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={member.name || ''}
                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter team member name"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={member.role || ''}
                  onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter role/position"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addTeamMember}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          + Add Team Member
        </button>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Upload Organization Chart (PDF/Image)
        </label>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-all duration-200">
          <input
            type="file"
            name="orgChart"
            onChange={handleFileChange}
            className="w-full px-4 py-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            accept=".pdf,.png,.jpg,.jpeg"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, PNG, JPG (Optional)</p>
        </div>
      </div>
    </div>
  );
}

export default FounderDetails;