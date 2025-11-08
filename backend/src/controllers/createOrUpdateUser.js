const User = require('../models/User');
const { ensureUser } = require('../utils/userUtils');

const createOrUpdateUser = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const userName = req.headers['x-user-name'] || null;
    const userEmail = req.headers['x-user-email'] || req.body.email || null;
    const userPicture = req.headers['x-user-picture'] || null;

    if (!userId) return res.status(401).json({ message: 'User ID required' });

    console.log('Create/Update user request:', { userId, userName, userEmail });

    const user = await ensureUser(userId, userName, userEmail, userPicture);
    
    const userProfile = {
      auth0Id: user.auth0Id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      aadhaarCardUrl: user.aadhaarCardUrl,
      createdAt: user.createdAt
    };

    res.status(200).json({ message: 'User created/updated successfully', user: userProfile });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = createOrUpdateUser;