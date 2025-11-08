import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const API_URL = import.meta.env.VITE_API_URL;

export function useCreateProject({ onClose }) {
  const { user, getAccessTokenSilently } = useAuth0();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic project info (keeping for backward compatibility)
    title: '',
    description: '',
    category: '',
    fundingGoal: '',
    equityOffered: '',
    duration: '30',
    media: null,
    panCard: '',

    // Section 1: Basic Company Information
    companyName: '',
    companyRegistrationNumber: '',
    dateOfIncorporation: '',
    typeOfCompany: '',
    industrySector: '',
    registeredOfficeAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pinCode: ''
    },
    companyWebsite: '',
    socialMediaLinks: {
      linkedin: '',
      twitter: '',
      facebook: ''
    },

    // Section 2: Founder and Team Details
    founders: [{
      fullName: '',
      email: '',
      phoneNumber: '',
      linkedinProfile: ''
    }],
    keyTeamMembers: [],
    orgChart: null,

    // Section 3: Business Model & Product
    elevatorPitch: '',
    detailedBusinessDescription: '',
    problemSolved: '',
    targetMarket: '',
    revenueModel: '',
    competitiveLandscape: '',
    productServiceDescription: '',
    productImages: null,
    pitchVideos: null,
    demoPrototypeLinks: [],

    // Section 4: Funding & Equity Details
    amountToRaise: '',
    equityOfferedPercent: '',
    previousFundingDetails: '',
    capTable: null,
    useOfFunds: '',

    // Section 5: Financial Information
    financialStatements: null,
    currentRevenue: '',
    monthlyAnnualRunRate: '',
    burnRateAndCashRunway: '',
    financialProjections: '',

    // Section 6: Legal & Compliance Documents
    certificateOfIncorporation: null,
    shareholdersAgreement: null,
    intellectualPropertyFilings: null,
    licensesAndPermits: null,
    pendingLitigations: {
      hasPendingLitigations: null,
      explanation: ''
    },

    // Section 7: MSME Status Declaration
    msmeStatus: {
      isRegisteredMSME: null,
      registrationCertificate: null
    },

    // Section 8: AI & Additional Data
    pressMentionUrls: [],
    customerTestimonials: null,
    socialMediaFollowersCount: {
      linkedin: '',
      twitter: '',
      instagram: ''
    },

    // Section 9: Consent and Declaration
    consentDeclarations: {
      informationAccuracy: false,
      termsOfServiceConsent: false,
      riskUnderstanding: false
    }
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [name]: files.length === 1 ? files[0] : Array.from(files)
      }));
    }
  };

  const validateStep = (currentStep) => {
    setError(null);
    
    switch (currentStep) {
      case 1: // Basic Company Information
        if (!formData.companyName || !formData.companyRegistrationNumber || 
            !formData.dateOfIncorporation || !formData.typeOfCompany || 
            !formData.industrySector || !formData.registeredOfficeAddress?.addressLine1 ||
            !formData.registeredOfficeAddress?.city || !formData.registeredOfficeAddress?.state ||
            !formData.registeredOfficeAddress?.pinCode) {
          setError('Please fill in all required company information fields');
          return false;
        }
        break;
      
      case 2: // Founder Details
        if (!formData.founders || formData.founders.length === 0 || 
            !formData.founders[0].fullName || !formData.founders[0].email ||
            !formData.founders[0].phoneNumber || !formData.founders[0].linkedinProfile) {
          setError('At least one founder with complete details is required');
          return false;
        }
        break;
      
      case 3: // Business Model
        if (!formData.elevatorPitch || !formData.detailedBusinessDescription ||
            !formData.problemSolved || !formData.targetMarket ||
            !formData.revenueModel || !formData.competitiveLandscape ||
            !formData.productServiceDescription) {
          setError('Please fill in all required business model fields');
          return false;
        }
        if (formData.elevatorPitch.length > 150) {
          setError('Elevator pitch must be 150 characters or less');
          return false;
        }
        break;
      
      case 4: // Funding Details
        if (!formData.amountToRaise || !formData.equityOfferedPercent || 
            !formData.useOfFunds || !files.capTable) {
          setError('Please fill in all required funding details and upload cap table');
          return false;
        }
        break;
      
      case 5: // Financial Information
        if (!formData.currentRevenue || !files.financialStatements) {
          setError('Please provide current revenue and upload financial statements');
          return false;
        }
        break;
      
      case 6: // Legal Documents
        if (!files.certificateOfIncorporation || formData.pendingLitigations?.hasPendingLitigations === null) {
          setError('Please upload certificate of incorporation and answer litigation question');
          return false;
        }
        if (formData.pendingLitigations?.hasPendingLitigations && !formData.pendingLitigations?.explanation) {
          setError('Please provide explanation for pending litigations');
          return false;
        }
        break;
      
      case 7: // MSME Status
        if (formData.msmeStatus?.isRegisteredMSME === null) {
          setError('Please indicate MSME registration status');
          return false;
        }
        if (formData.msmeStatus?.isRegisteredMSME && !files.msmeRegistrationCertificate) {
          setError('Please upload MSME registration certificate');
          return false;
        }
        break;
      
      case 8: // Additional Data - no required fields
        break;
      
      case 9: // Consent Declaration
        if (!formData.consentDeclarations?.informationAccuracy ||
            !formData.consentDeclarations?.termsOfServiceConsent ||
            !formData.consentDeclarations?.riskUnderstanding) {
          setError('All consent declarations must be checked');
          return false;
        }
        break;
    }
    
    return true;
  };

  const handleNextStep = (nextStep) => {
    if (validateStep(step)) {
      setStep(nextStep);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(9)) {
      return;
    }

    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    
    // Basic project info (backward compatibility)
    formDataToSend.append('title', formData.title || formData.companyName);
    formDataToSend.append('description', formData.description || formData.elevatorPitch);
    formDataToSend.append('category', formData.category || formData.industrySector);
    formDataToSend.append('fundingGoal', formData.fundingGoal || formData.amountToRaise);
    formDataToSend.append('equityOffered', formData.equityOffered || formData.equityOfferedPercent);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('name', user.name);
    formDataToSend.append('email', user.email);
    
    // Section 1: Basic Company Information
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('companyRegistrationNumber', formData.companyRegistrationNumber);
    formDataToSend.append('dateOfIncorporation', formData.dateOfIncorporation);
    formDataToSend.append('typeOfCompany', formData.typeOfCompany);
    formDataToSend.append('industrySector', formData.industrySector);
    formDataToSend.append('addressLine1', formData.registeredOfficeAddress.addressLine1);
    formDataToSend.append('addressLine2', formData.registeredOfficeAddress.addressLine2 || '');
    formDataToSend.append('city', formData.registeredOfficeAddress.city);
    formDataToSend.append('state', formData.registeredOfficeAddress.state);
    formDataToSend.append('pinCode', formData.registeredOfficeAddress.pinCode);
    formDataToSend.append('companyWebsite', formData.companyWebsite || '');
    formDataToSend.append('linkedinUrl', formData.socialMediaLinks.linkedin || '');
    formDataToSend.append('twitterUrl', formData.socialMediaLinks.twitter || '');
    formDataToSend.append('facebookUrl', formData.socialMediaLinks.facebook || '');

    // Section 2: Founder and Team Details
    formDataToSend.append('founders', JSON.stringify(formData.founders));
    formDataToSend.append('keyTeamMembers', JSON.stringify(formData.keyTeamMembers));

    // Section 3: Business Model & Product
    formDataToSend.append('elevatorPitch', formData.elevatorPitch);
    formDataToSend.append('detailedBusinessDescription', formData.detailedBusinessDescription);
    formDataToSend.append('problemSolved', formData.problemSolved);
    formDataToSend.append('targetMarket', formData.targetMarket);
    formDataToSend.append('revenueModel', formData.revenueModel);
    formDataToSend.append('competitiveLandscape', formData.competitiveLandscape);
    formDataToSend.append('productServiceDescription', formData.productServiceDescription);
    formDataToSend.append('demoPrototypeLinks', JSON.stringify(formData.demoPrototypeLinks));

    // Section 4: Funding & Equity Details
    formDataToSend.append('amountToRaise', formData.amountToRaise);
    formDataToSend.append('equityOfferedPercent', formData.equityOfferedPercent);
    formDataToSend.append('previousFundingDetails', formData.previousFundingDetails || '');
    formDataToSend.append('useOfFunds', formData.useOfFunds);

    // Section 5: Financial Information
    formDataToSend.append('currentRevenue', formData.currentRevenue);
    formDataToSend.append('monthlyAnnualRunRate', formData.monthlyAnnualRunRate || '');
    formDataToSend.append('burnRateAndCashRunway', formData.burnRateAndCashRunway || '');
    formDataToSend.append('financialProjections', formData.financialProjections || '');

    // Section 6: Legal & Compliance Documents
    formDataToSend.append('hasPendingLitigations', formData.pendingLitigations.hasPendingLitigations);
    formDataToSend.append('litigationExplanation', formData.pendingLitigations.explanation || '');

    // Section 7: MSME Status Declaration
    formDataToSend.append('isRegisteredMSME', formData.msmeStatus.isRegisteredMSME);

    // Section 8: AI & Additional Data
    formDataToSend.append('pressMentionUrls', JSON.stringify(formData.pressMentionUrls));
    formDataToSend.append('linkedinFollowers', formData.socialMediaFollowersCount.linkedin || '');
    formDataToSend.append('twitterFollowers', formData.socialMediaFollowersCount.twitter || '');
    formDataToSend.append('instagramFollowers', formData.socialMediaFollowersCount.instagram || '');

    // Section 9: Consent and Declaration
    formDataToSend.append('informationAccuracy', formData.consentDeclarations.informationAccuracy);
    formDataToSend.append('termsOfServiceConsent', formData.consentDeclarations.termsOfServiceConsent);
    formDataToSend.append('riskUnderstanding', formData.consentDeclarations.riskUnderstanding);

    // Add all files
    Object.entries(files).forEach(([fieldName, fileData]) => {
      if (Array.isArray(fileData)) {
        fileData.forEach(file => {
          formDataToSend.append(fieldName, file);
        });
      } else if (fileData) {
        formDataToSend.append(fieldName, fileData);
      }
    });

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'X-User-ID': user.sub,
          'X-User-Email': user.email || '',
          'X-User-Picture': user.picture || '',
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      const result = await response.json();
      console.log('Project created:', result);
      onClose();
    } catch (err) {
      setError(err.message);
      console.error('Error creating project:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep: handleNextStep,
    formData,
    setFormData,
    error,
    loading,
    handleFileChange,
    handleSubmit,
  };
}