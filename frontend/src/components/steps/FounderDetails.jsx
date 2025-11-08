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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 2: Founder and Team Details</h3>
      
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Founder Details *</h4>
        {(formData.founders || [{}]).map((founder, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h5 className="font-medium text-gray-700">Founder {index + 1}</h5>
              {formData.founders && formData.founders.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFounder(index)}
                  className="text-red-500 hover:text-red-700"
                  disabled={loading}
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={founder.fullName || ''}
                  onChange={(e) => handleFounderChange(index, 'fullName', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={founder.email || ''}
                  onChange={(e) => handleFounderChange(index, 'email', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={founder.phoneNumber || ''}
                  onChange={(e) => handleFounderChange(index, 'phoneNumber', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile *
                </label>
                <input
                  type="url"
                  value={founder.linkedinProfile || ''}
                  onChange={(e) => handleFounderChange(index, 'linkedinProfile', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          Add Another Founder
        </button>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-700 mb-3">Key Team Members</h4>
        {(formData.keyTeamMembers || []).map((member, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h5 className="font-medium text-gray-700">Team Member {index + 1}</h5>
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="text-red-500 hover:text-red-700"
                disabled={loading}
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={member.name || ''}
                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter team member name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={member.role || ''}
                  onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        >
          Add Team Member
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Organization Chart (PDF/Image)
        </label>
        <input
          type="file"
          name="orgChart"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.png,.jpg,.jpeg"
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, PNG, JPG</p>
      </div>
    </div>
  );
}

export default FounderDetails;