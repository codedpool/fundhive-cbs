const mongoose = require('mongoose');

const escrowTransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['investment', 'crowdfunding'], required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true }, // Mock blockchain transaction ID
  status: { type: String, enum: ['pending', 'released', 'refunded'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  
  // Basic project info (keeping existing for backward compatibility)
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  fundingGoal: { type: Number, required: true },
  equityOffered: { type: Number, required: true },
  duration: { type: Number, required: true },
  mediaUrl: { type: String },
  status: { type: String, default: 'active' },
  currentFunding: { type: Number, default: 0 },
  likes: [{ type: String }],
  comments: [{ userId: String, content: String, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now },
  startDate: { type: Date, default: Date.now },
  negotiationRequests: [{
    investorId: { type: String, required: true },
    proposedAmount: { type: Number, required: true },
    proposedEquity: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] },
    createdAt: { type: Date, default: Date.now }
  }],
  escrowTransactions: [escrowTransactionSchema],

  // Section 1: Basic Company Information
  companyName: { type: String, required: true },
  companyRegistrationNumber: { type: String, required: true },
  dateOfIncorporation: { type: Date, required: true },
  typeOfCompany: { 
    type: String, 
    required: true,
    enum: ['Private Ltd', 'LLP', 'Partnership', 'Sole Proprietorship', 'Others']
  },
  industrySector: { type: String, required: true },
  registeredOfficeAddress: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true }
  },
  companyWebsite: { type: String },
  socialMediaLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String }
  },

  // Section 2: Founder and Team Details
  founders: [{
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    linkedinProfile: { type: String, required: true }
  }],
  keyTeamMembers: [{
    name: { type: String },
    role: { type: String }
  }],
  orgChartUrl: { type: String },

  // Section 3: Business Model & Product
  elevatorPitch: { type: String, required: true, maxlength: 150 },
  detailedBusinessDescription: { type: String, required: true },
  problemSolved: { type: String, required: true },
  targetMarket: { type: String, required: true },
  revenueModel: { type: String, required: true },
  competitiveLandscape: { type: String, required: true },
  productServiceDescription: { type: String, required: true },
  productImages: [{ type: String }],
  pitchVideos: [{ type: String }],
  demoPrototypeLinks: [{ type: String }],

  // Section 4: Funding & Equity Details (enhanced existing fields)
  amountToRaise: { type: Number, required: true },
  equityOfferedPercent: { type: Number, required: true },
  previousFundingDetails: { type: String },
  capTableUrl: { type: String, required: true },
  useOfFunds: { type: String, required: true },

  // Section 5: Financial Information
  financialStatementsUrls: [{ type: String, required: true }],
  currentRevenue: { type: Number, required: true },
  monthlyAnnualRunRate: { type: Number },
  burnRateAndCashRunway: { type: String },
  financialProjections: { type: String },

  // Section 6: Legal & Compliance Documents
  certificateOfIncorporationUrl: { type: String, required: true },
  shareholdersAgreementUrl: { type: String },
  intellectualPropertyFilingsUrls: [{ type: String }],
  licensesAndPermitsUrls: [{ type: String }],
  pendingLitigations: {
    hasPendingLitigations: { type: Boolean, required: true },
    explanation: { type: String }
  },

  // Section 7: MSME Status Declaration
  msmeStatus: {
    isRegisteredMSME: { type: Boolean, required: true },
    registrationCertificateUrl: { type: String }
  },

  // Section 8: AI & Additional Data
  pressMentionUrls: [{ type: String }],
  customerTestimonialsUrls: [{ type: String }],
  socialMediaFollowersCount: {
    linkedin: { type: Number },
    twitter: { type: Number },
    instagram: { type: Number }
  },

  // Section 9: Consent and Declaration
  consentDeclarations: {
    informationAccuracy: { type: Boolean, required: true },
    termsOfServiceConsent: { type: Boolean, required: true },
    riskUnderstanding: { type: Boolean, required: true }
  }
});

module.exports = mongoose.model('Project', projectSchema);