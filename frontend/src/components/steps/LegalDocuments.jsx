import React from 'react';

function LegalDocuments({ formData, setFormData, loading, handleFileChange }) {
  const handleLitigationChange = (field, value) => {
    setFormData({
      ...formData,
      pendingLitigations: {
        ...formData.pendingLitigations,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 6: Legal & Compliance Documents</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Certificate of Incorporation (PDF) *
        </label>
        <input
          type="file"
          name="certificateOfIncorporation"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf"
          required
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Required: PDF format</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Shareholders Agreement (Optional)
        </label>
        <input
          type="file"
          name="shareholdersAgreement"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf"
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Optional: PDF format</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Intellectual Property Filings/Patents (If any)
        </label>
        <input
          type="file"
          name="intellectualPropertyFilings"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf"
          multiple
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Optional: PDF format, max 5 files</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Licenses and Permits (If applicable)
        </label>
        <input
          type="file"
          name="licensesAndPermits"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf"
          multiple
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Optional: PDF format, max 5 files</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <h4 className="font-semibold text-gray-800 mb-3">Disclosure of Pending Litigations</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are there any pending litigations against the company? *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pendingLitigations"
                  value="true"
                  checked={formData.pendingLitigations?.hasPendingLitigations === true}
                  onChange={(e) => handleLitigationChange('hasPendingLitigations', e.target.value === 'true')}
                  className="mr-2"
                  required
                  disabled={loading}
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pendingLitigations"
                  value="false"
                  checked={formData.pendingLitigations?.hasPendingLitigations === false}
                  onChange={(e) => handleLitigationChange('hasPendingLitigations', e.target.value === 'true')}
                  className="mr-2"
                  required
                  disabled={loading}
                />
                No
              </label>
            </div>
          </div>

          {formData.pendingLitigations?.hasPendingLitigations && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please provide details of pending litigations *
              </label>
              <textarea
                value={formData.pendingLitigations?.explanation || ''}
                onChange={(e) => handleLitigationChange('explanation', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder="Provide details about the pending litigations, including nature, status, and potential impact"
                required={formData.pendingLitigations?.hasPendingLitigations}
                disabled={loading}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Legal Notice</h4>
        <p className="text-sm text-yellow-700">
          All legal documents uploaded will be verified by our legal team. Any discrepancies or 
          missing information may delay the approval process. Please ensure all documents are 
          current, properly signed, and legally valid.
        </p>
      </div>
    </div>
  );
}

export default LegalDocuments;