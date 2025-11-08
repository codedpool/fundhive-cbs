const Project = require('../models/Project');
const User = require('../models/User');
const { upload } = require('../config/multerConfig');
const { ensureUser } = require('../utils/userUtils');
const { uploadToS3 } = require('../utils/s3Utils');

const createProject = [
  upload.fields([
    { name: 'media', maxCount: 1 },
    { name: 'orgChart', maxCount: 1 },
    { name: 'productImages', maxCount: 5 },
    { name: 'pitchVideos', maxCount: 2 },
    { name: 'capTable', maxCount: 1 },
    { name: 'financialStatements', maxCount: 3 },
    { name: 'certificateOfIncorporation', maxCount: 1 },
    { name: 'shareholdersAgreement', maxCount: 1 },
    { name: 'intellectualPropertyFilings', maxCount: 5 },
    { name: 'licensesAndPermits', maxCount: 5 },
    { name: 'msmeRegistrationCertificate', maxCount: 1 },
    { name: 'customerTestimonials', maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const {
        // Basic project info (keeping for backward compatibility)
        title, description, category, fundingGoal, equityOffered, duration,
        
        // Section 1: Basic Company Information
        companyName, companyRegistrationNumber, dateOfIncorporation, typeOfCompany,
        industrySector, addressLine1, addressLine2, city, state, pinCode,
        companyWebsite, linkedinUrl, twitterUrl, facebookUrl,
        
        // Section 2: Founder and Team Details
        founders, keyTeamMembers,
        
        // Section 3: Business Model & Product
        elevatorPitch, detailedBusinessDescription, problemSolved, targetMarket,
        revenueModel, competitiveLandscape, productServiceDescription, demoPrototypeLinks,
        
        // Section 4: Funding & Equity Details
        amountToRaise, equityOfferedPercent, previousFundingDetails, useOfFunds,
        
        // Section 5: Financial Information
        currentRevenue, monthlyAnnualRunRate, burnRateAndCashRunway, financialProjections,
        
        // Section 6: Legal & Compliance Documents
        hasPendingLitigations, litigationExplanation,
        
        // Section 7: MSME Status Declaration
        isRegisteredMSME,
        
        // Section 8: AI & Additional Data
        pressMentionUrls, linkedinFollowers, twitterFollowers, instagramFollowers,
        
        // Section 9: Consent and Declaration
        informationAccuracy, termsOfServiceConsent, riskUnderstanding,
        
        name, email
      } = req.body;

      const userId = req.headers['x-user-id'];
      const userPicture = req.headers['x-user-picture'];
      const userEmail = email || req.headers['x-user-email'] || null;

      console.log('Creating comprehensive project with userId:', userId);

      if (!userId) return res.status(401).json({ message: 'User ID required' });

      // Basic validation for required fields
      if (!companyName || !companyRegistrationNumber || !dateOfIncorporation || !typeOfCompany) {
        return res.status(400).json({ message: 'Basic company information is required' });
      }

      // Check if user has uploaded Aadhaar card
      const user = await User.findOne({ auth0Id: userId });
      if (!user || !user.aadhaarCardUrl) {
        return res.status(403).json({ message: 'Please upload your Aadhaar card in your profile before creating a project.' });
      }

      await ensureUser(userId, name, userEmail, userPicture);

      // Handle file uploads
      const uploadedFiles = {};
      
      if (req.files) {
        for (const [fieldName, files] of Object.entries(req.files)) {
          if (files && files.length > 0) {
            if (fieldName === 'productImages' || fieldName === 'pitchVideos' || 
                fieldName === 'financialStatements' || fieldName === 'intellectualPropertyFilings' ||
                fieldName === 'licensesAndPermits' || fieldName === 'customerTestimonials') {
              // Handle multiple files
              uploadedFiles[fieldName] = [];
              for (const file of files) {
                const filename = `${fieldName}/${Date.now()}-${file.originalname}`;
                const s3Response = await uploadToS3(file, filename);
                uploadedFiles[fieldName].push(s3Response.Location);
              }
            } else {
              // Handle single files
              const file = files[0];
              const filename = `${fieldName}/${Date.now()}-${file.originalname}`;
              const s3Response = await uploadToS3(file, filename);
              uploadedFiles[fieldName] = s3Response.Location;
            }
          }
        }
      }

      // Parse JSON strings
      const foundersData = founders ? JSON.parse(founders) : [];
      const keyTeamMembersData = keyTeamMembers ? JSON.parse(keyTeamMembers) : [];
      const demoLinksData = demoPrototypeLinks ? JSON.parse(demoPrototypeLinks) : [];
      const pressMentionsData = pressMentionUrls ? JSON.parse(pressMentionUrls) : [];

      const project = new Project({
        userId,
        
        // Basic project info (backward compatibility)
        title: title || companyName,
        description: description || elevatorPitch,
        category: category || industrySector,
        fundingGoal: Number(fundingGoal || amountToRaise),
        equityOffered: Number(equityOffered || equityOfferedPercent),
        duration: Number(duration) || 30,
        mediaUrl: uploadedFiles.media,
        
        // Section 1: Basic Company Information
        companyName,
        companyRegistrationNumber,
        dateOfIncorporation: new Date(dateOfIncorporation),
        typeOfCompany,
        industrySector,
        registeredOfficeAddress: {
          addressLine1,
          addressLine2,
          city,
          state,
          pinCode
        },
        companyWebsite,
        socialMediaLinks: {
          linkedin: linkedinUrl,
          twitter: twitterUrl,
          facebook: facebookUrl
        },

        // Section 2: Founder and Team Details
        founders: foundersData,
        keyTeamMembers: keyTeamMembersData,
        orgChartUrl: uploadedFiles.orgChart,

        // Section 3: Business Model & Product
        elevatorPitch,
        detailedBusinessDescription,
        problemSolved,
        targetMarket,
        revenueModel,
        competitiveLandscape,
        productServiceDescription,
        productImages: uploadedFiles.productImages || [],
        pitchVideos: uploadedFiles.pitchVideos || [],
        demoPrototypeLinks: demoLinksData,

        // Section 4: Funding & Equity Details
        amountToRaise: Number(amountToRaise),
        equityOfferedPercent: Number(equityOfferedPercent),
        previousFundingDetails,
        capTableUrl: uploadedFiles.capTable,
        useOfFunds,

        // Section 5: Financial Information
        financialStatementsUrls: uploadedFiles.financialStatements || [],
        currentRevenue: Number(currentRevenue),
        monthlyAnnualRunRate: monthlyAnnualRunRate ? Number(monthlyAnnualRunRate) : undefined,
        burnRateAndCashRunway,
        financialProjections,

        // Section 6: Legal & Compliance Documents
        certificateOfIncorporationUrl: uploadedFiles.certificateOfIncorporation,
        shareholdersAgreementUrl: uploadedFiles.shareholdersAgreement,
        intellectualPropertyFilingsUrls: uploadedFiles.intellectualPropertyFilings || [],
        licensesAndPermitsUrls: uploadedFiles.licensesAndPermits || [],
        pendingLitigations: {
          hasPendingLitigations: hasPendingLitigations === 'true',
          explanation: litigationExplanation
        },

        // Section 7: MSME Status Declaration
        msmeStatus: {
          isRegisteredMSME: isRegisteredMSME === 'true',
          registrationCertificateUrl: uploadedFiles.msmeRegistrationCertificate
        },

        // Section 8: AI & Additional Data
        pressMentionUrls: pressMentionsData,
        customerTestimonialsUrls: uploadedFiles.customerTestimonials || [],
        socialMediaFollowersCount: {
          linkedin: linkedinFollowers ? Number(linkedinFollowers) : undefined,
          twitter: twitterFollowers ? Number(twitterFollowers) : undefined,
          instagram: instagramFollowers ? Number(instagramFollowers) : undefined
        },

        // Section 9: Consent and Declaration
        consentDeclarations: {
          informationAccuracy: informationAccuracy === 'true',
          termsOfServiceConsent: termsOfServiceConsent === 'true',
          riskUnderstanding: riskUnderstanding === 'true'
        },

        startDate: new Date(),
      });

      await project.save();
      res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
      console.error('Error creating project:', error.stack);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

module.exports = createProject;