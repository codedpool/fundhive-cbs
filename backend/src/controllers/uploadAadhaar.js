const User = require('../models/User');
const { upload } = require('../config/multerConfig');
const { uploadToS3 } = require('../utils/s3Utils');
const { ensureUser } = require('../utils/userUtils');

const uploadAadhaar = [
  upload.single('aadhaar'),
  async (req, res) => {
    try {
      const userId = req.headers['x-user-id'];
      if (!userId) return res.status(401).json({ message: 'User ID required' });

      // Get user info from headers and body
      const userPicture = req.headers['x-user-picture'] || null;
      const userName = req.headers['x-user-name'] || null;
      const userEmail = req.headers['x-user-email'] || req.body.email || null;

      console.log('Upload Aadhaar - User data received:', {
        userId,
        userName,
        userEmail,
        userPicture: userPicture ? 'present' : 'missing'
      });

      // Ensure user exists in database (create if doesn't exist)
      // This allows first-time users to upload Aadhaar before creating projects
      let user = await ensureUser(userId, userName, userEmail, userPicture);

      if (!req.file) return res.status(400).json({ message: 'Aadhaar card file required' });

      // Get file extension from original filename and validate
      const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
      
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({ 
          message: 'Invalid file type. Please upload a PDF, JPG, JPEG, or PNG file.' 
        });
      }

      const filename = `${userId}-aadhaar-${Date.now()}.${fileExtension}`;
      console.log('Uploading file:', { originalName: req.file.originalname, filename, fileSize: req.file.size });
      
      const s3Response = await uploadToS3(req.file, filename);
      const aadhaarCardUrl = s3Response.Location;

      console.log('S3 upload successful:', aadhaarCardUrl);
      console.log('User before update:', { 
        id: user._id, 
        username: user.username, 
        currentAadhaar: user.aadhaarCardUrl 
      });

      user.aadhaarCardUrl = aadhaarCardUrl;
      const savedUser = await user.save();
      
      console.log('User after save:', { 
        id: savedUser._id, 
        username: savedUser.username, 
        aadhaarCardUrl: savedUser.aadhaarCardUrl 
      });

      res.status(200).json({ message: 'Aadhaar card uploaded successfully', aadhaarCardUrl });
    } catch (error) {
      console.error('Error uploading Aadhaar card:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

module.exports = uploadAadhaar;