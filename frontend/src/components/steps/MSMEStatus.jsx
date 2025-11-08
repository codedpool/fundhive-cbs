import React from 'react';

function MSMEStatus({ formData, setFormData, loading, handleFileChange }) {
  const handleMSMEChange = (field, value) => {
    setFormData({
      ...formData,
      msmeStatus: {
        ...formData.msmeStatus,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 7: MSME Status Declaration</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">What is MSME?</h4>
        <p className="text-sm text-blue-700">
          Micro, Small and Medium Enterprises (MSME) is a classification for businesses based on 
          investment in plant and machinery or equipment and annual turnover. MSME registration 
          provides various benefits including easier access to credit, subsidies, and government schemes.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you registered as an MSME? *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="msmeRegistration"
                  value="true"
                  checked={formData.msmeStatus?.isRegisteredMSME === true}
                  onChange={(e) => handleMSMEChange('isRegisteredMSME', e.target.value === 'true')}
                  className="mr-2"
                  required
                  disabled={loading}
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="msmeRegistration"
                  value="false"
                  checked={formData.msmeStatus?.isRegisteredMSME === false}
                  onChange={(e) => handleMSMEChange('isRegisteredMSME', e.target.value === 'true')}
                  className="mr-2"
                  required
                  disabled={loading}
                />
                No
              </label>
            </div>
          </div>

          {formData.msmeStatus?.isRegisteredMSME && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload MSME Registration Certificate *
              </label>
              <input
                type="file"
                name="msmeRegistrationCertificate"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept=".pdf,.jpg,.jpeg,.png"
                required={formData.msmeStatus?.isRegisteredMSME}
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Required if MSME registered: PDF, JPG, or PNG format
              </p>
            </div>
          )}

          {formData.msmeStatus?.isRegisteredMSME === false && (
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <h5 className="font-semibold text-yellow-800 mb-1">Not Registered as MSME?</h5>
              <p className="text-sm text-yellow-700">
                Consider registering your business as MSME to avail various benefits including:
              </p>
              <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside">
                <li>Easier access to credit and loans</li>
                <li>Government subsidies and schemes</li>
                <li>Tax benefits and exemptions</li>
                <li>Priority in government tenders</li>
                <li>Support for technology upgradation</li>
              </ul>
              <p className="text-sm text-yellow-700 mt-2">
                You can register online at: <span className="font-semibold">udyamregistration.gov.in</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">MSME Classification Criteria</h4>
        <div className="text-sm text-green-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-semibold">Micro</h5>
              <p>Investment: Up to ₹1 Crore</p>
              <p>Turnover: Up to ₹5 Crore</p>
            </div>
            <div>
              <h5 className="font-semibold">Small</h5>
              <p>Investment: Up to ₹10 Crore</p>
              <p>Turnover: Up to ₹50 Crore</p>
            </div>
            <div>
              <h5 className="font-semibold">Medium</h5>
              <p>Investment: Up to ₹50 Crore</p>
              <p>Turnover: Up to ₹250 Crore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MSMEStatus;