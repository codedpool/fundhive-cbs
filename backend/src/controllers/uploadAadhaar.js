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

      // Get optional user info from headers
      const userPicture = req.headers['x-user-picture'] || null;
      const userName = req.headers['x-user-name'] || null;

      // Ensure user exists in database (create if doesn't exist)
      // This allows first-time users to upload Aadhaar before creating projects
      let user = await ensureUser(userId, userName, null, userPicture);

      if (!req.file) return res.status(400).json({ message: 'Aadhaar card file required' });

      const filename = `${userId}-aadhaar-${Date.now()}.pdf`; // Assuming PDF format
      const s3Response = await uploadToS3(req.file, filename);
      const aadhaarCardUrl = s3Response.Location;

      user.aadhaarCardUrl = aadhaarCardUrl;
      await user.save();

      res.status(200).json({ message: 'Aadhaar card uploaded successfully', aadhaarCardUrl });
    } catch (error) {
      console.error('Error uploading Aadhaar card:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

module.exports = uploadAadhaar;