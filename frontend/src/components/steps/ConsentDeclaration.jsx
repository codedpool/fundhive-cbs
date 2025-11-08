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
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Consent and Declaration</h3>
        <p className="text-gray-600">Final step - Please review and accept the terms</p>
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
        <h4 className="font-bold text-red-800 mb-3 text-lg flex items-center">
          <span className="text-2xl mr-2">⚠️</span>
          Important Legal Notice
        </h4>
        <p className="text-sm text-red-700 leading-relaxed">
          Please read each declaration carefully before providing your consent. These declarations 
          are legally binding and form part of your agreement with Fundhive.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-2 border-blue-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <label className="flex items-start space-x-4 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentDeclarations?.informationAccuracy || false}
              onChange={(e) => handleConsentChange('informationAccuracy', e.target.checked)}
              className="mt-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
              disabled={loading}
            />
            <div className="text-sm flex-1">
              <span className="font-bold text-blue-900 text-lg">✓ Information Accuracy Declaration</span>
              <p className="text-gray-700 mt-2 leading-relaxed">
                I confirm that the information provided is true and accurate to the best of my knowledge. 
                I understand that any false or misleading information may result in rejection of my 
                application and potential legal consequences.
              </p>
            </div>
          </label>
        </div>

        <div className="bg-white border-2 border-green-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <label className="flex items-start space-x-4 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentDeclarations?.termsOfServiceConsent || false}
              onChange={(e) => handleConsentChange('termsOfServiceConsent', e.target.checked)}
              className="mt-2 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              required
              disabled={loading}
            />
            <div className="text-sm flex-1">
              <span className="font-bold text-green-900 text-lg">✓ Terms of Service and AI Credit Scoring Consent</span>
              <p className="text-gray-700 mt-2 leading-relaxed">
                I consent to Fundhive's Terms of Service and Privacy Policy. I understand and agree 
                that my business information will be processed through AI-powered credit scoring 
                and evaluation systems to assess investment viability and match with potential investors.
              </p>
              <div className="mt-3 flex space-x-4">
                <a href="#" className="text-green-600 hover:text-green-800 underline text-sm font-medium">
                  📄 Read Terms of Service
                </a>
                <a href="#" className="text-green-600 hover:text-green-800 underline text-sm font-medium">
                  🔒 Read Privacy Policy
                </a>
              </div>
            </div>
          </label>
        </div>

        <div className="bg-white border-2 border-purple-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <label className="flex items-start space-x-4 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentDeclarations?.riskUnderstanding || false}
              onChange={(e) => handleConsentChange('riskUnderstanding', e.target.checked)}
              className="mt-2 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              required
              disabled={loading}
            />
            <div className="text-sm flex-1">
              <span className="font-bold text-purple-900 text-lg">✓ Risk Understanding and Compliance Declaration</span>
              <p className="text-gray-700 mt-2 leading-relaxed">
                I understand the risks involved in equity crowdfunding and confirm that I have 
                obtained all necessary approvals and compliance clearances required for raising 
                funds through equity crowdfunding. I acknowledge that investment returns are not 
                guaranteed and investors may lose their entire investment.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            Key Risks to Consider
          </h4>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Equity crowdfunding investments are high-risk and illiquid
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              There is no guarantee of returns or successful exit
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Investors may lose their entire investment
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Regulatory changes may affect crowdfunding operations
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center">
            <span className="text-xl mr-2">📋</span>
            Compliance Requirements
          </h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Ensure compliance with SEBI crowdfunding regulations
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Maintain accurate financial records and reporting
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Provide regular updates to investors
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Obtain necessary regulatory approvals
            </li>
          </ul>
        </div>
      </div>

      {!isFormValid && (
        <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200 text-center">
          <p className="text-red-700 font-bold text-lg flex items-center justify-center">
            <span className="text-2xl mr-3">⚠️</span>
            All consent declarations must be checked before you can proceed.
          </p>
        </div>
      )}

      {isFormValid && (
        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 text-center">
          <p className="text-green-700 font-bold text-lg flex items-center justify-center">
            <span className="text-2xl mr-3">✅</span>
            All declarations completed. You can now submit your application!
          </p>
          <p className="text-green-600 text-sm mt-2">
            Ready to submit your comprehensive fundraising application.
          </p>
        </div>
      )}
    </div>
  );
}

export default ConsentDeclaration;