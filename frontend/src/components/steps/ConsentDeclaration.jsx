import React from 'react';

function ConsentDeclaration({ formData, setFormData, loading }) {
  const handleConsentChange = (field, value) => {
    setFormData({
      ...formData,
      consentDeclarations: {
        ...formData.consentDeclarations,
        [field]: value
      }
    });
  };

  const isFormValid = formData.consentDeclarations?.informationAccuracy && 
                     formData.consentDeclarations?.termsOfServiceConsent && 
                     formData.consentDeclarations?.riskUnderstanding;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 9: Consent and Declaration</h3>
      
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h4 className="font-semibold text-red-800 mb-2">Important Legal Notice</h4>
        <p className="text-sm text-red-700">
          Please read each declaration carefully before providing your consent. These declarations 
          are legally binding and form part of your agreement with Fundhive.
        </p>
      </div>

      <div className="space-y-4">
        <div className="border p-4 rounded-lg bg-gray-50">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consentDeclarations?.informationAccuracy || false}
              onChange={(e) => handleConsentChange('informationAccuracy', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
              disabled={loading}
            />
            <div className="text-sm">
              <span className="font-medium text-gray-900">Information Accuracy Declaration *</span>
              <p className="text-gray-700 mt-1">
                I confirm that the information provided is true and accurate to the best of my knowledge. 
                I understand that any false or misleading information may result in rejection of my 
                application and potential legal consequences.
              </p>
            </div>
          </label>
        </div>

        <div className="border p-4 rounded-lg bg-gray-50">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consentDeclarations?.termsOfServiceConsent || false}
              onChange={(e) => handleConsentChange('termsOfServiceConsent', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
              disabled={loading}
            />
            <div className="text-sm">
              <span className="font-medium text-gray-900">Terms of Service and AI Credit Scoring Consent *</span>
              <p className="text-gray-700 mt-1">
                I consent to Fundhive's Terms of Service and Privacy Policy. I understand and agree 
                that my business information will be processed through AI-powered credit scoring 
                and evaluation systems to assess investment viability and match with potential investors.
              </p>
              <div className="mt-2">
                <a href="#" className="text-blue-600 hover:text-blue-800 underline text-xs">
                  Read Terms of Service
                </a>
                {' | '}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline text-xs">
                  Read Privacy Policy
                </a>
              </div>
            </div>
          </label>
        </div>

        <div className="border p-4 rounded-lg bg-gray-50">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consentDeclarations?.riskUnderstanding || false}
              onChange={(e) => handleConsentChange('riskUnderstanding', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
              disabled={loading}
            />
            <div className="text-sm">
              <span className="font-medium text-gray-900">Risk Understanding and Compliance Declaration *</span>
              <p className="text-gray-700 mt-1">
                I understand the risks involved in equity crowdfunding and confirm that I have 
                obtained all necessary approvals and compliance clearances required for raising 
                funds through equity crowdfunding. I acknowledge that investment returns are not 
                guaranteed and investors may lose their entire investment.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">Key Risks to Consider</h4>
        <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
          <li>Equity crowdfunding investments are high-risk and illiquid</li>
          <li>There is no guarantee of returns or successful exit</li>
          <li>Investors may lose their entire investment</li>
          <li>Regulatory changes may affect crowdfunding operations</li>
          <li>Market conditions may impact business performance</li>
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Compliance Requirements</h4>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Ensure compliance with SEBI crowdfunding regulations</li>
          <li>Maintain accurate financial records and reporting</li>
          <li>Provide regular updates to investors</li>
          <li>Comply with disclosure requirements</li>
          <li>Obtain necessary regulatory approvals</li>
        </ul>
      </div>

      {!isFormValid && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ All consent declarations must be checked before you can proceed.
          </p>
        </div>
      )}

      {isFormValid && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 font-medium">
            ✅ All declarations completed. You can now submit your application.
          </p>
        </div>
      )}
    </div>
  );
}

export default ConsentDeclaration;