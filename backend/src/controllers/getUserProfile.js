const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ message: 'User ID required' });

    const user = await User.findOne({ auth0Id: userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile data
    const userProfile = {
      auth0Id: user.auth0Id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      aadhaarCardUrl: user.aadhaarCardUrl,
      role: user.role, // Add role field
      createdAt: user.createdAt
    };

    console.log('User profile fetched:', { 
      username: user.username, 
      role: user.role,
      hasAadhaar: !!user.aadhaarCardUrl 
    });

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = getUserProfile;