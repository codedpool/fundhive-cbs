import React from 'react';
import BasicCompanyInfo from './steps/BasicCompanyInfo';
import FounderDetails from './steps/FounderDetails';
import BusinessModel from './steps/BusinessModel';
import FundingDetails from './steps/FundingDetails';
import FinancialInfo from './steps/FinancialInfo';
import LegalDocuments from './steps/LegalDocuments';
import MSMEStatus from './steps/MSMEStatus';
import AdditionalData from './steps/AdditionalData';
import ConsentDeclaration from './steps/ConsentDeclaration';

function StepForm({ step, formData, setFormData, handleFileChange, loading }) {
  return (
    <div className="p-6">
      {step === 1 && <BasicCompanyInfo formData={formData} setFormData={setFormData} loading={loading} />}
      {step === 2 && <FounderDetails formData={formData} setFormData={setFormData} loading={loading} handleFileChange={handleFileChange} />}
      {step === 3 && <BusinessModel formData={formData} setFormData={setFormData} loading={loading} handleFileChange={handleFileChange} />}
      {step === 4 && <FundingDetails formData={formData} setFormData={setFormData} loading={loading} handleFileChange={handleFileChange} />}
      {step === 5 && <FinancialInfo formData={formData} setFormData={setFormData} loading={loading} handleFileChange={handleFileChange} />}
      {step === 6 && <LegalDocuments formData={formData} setFormData={setFormData} loading={loading} handleFileChange={handleFileChange} />}
      {step === 7 && <MSMEStatus formData={formData} setFormData={setFormData} loading={loading} handleFileChange={handleFileChange} />}
      {step === 8 && <AdditionalData formData={formData} setFormData={setFormData} loading={loading} handleFileChange={handleFileChange} />}
      {step === 9 && <ConsentDeclaration formData={formData} setFormData={setFormData} loading={loading} />}
    </div>
  );
}

export default StepForm;