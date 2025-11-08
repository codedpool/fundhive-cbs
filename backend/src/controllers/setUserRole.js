// backend/src/controllers/setUserRole.js
const User = require('../models/User');
const { extractUserFromHeaders } = require('../utils/userUtils');

const setUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userHeaders = extractUserFromHeaders(req.headers);

    if (!role || !['user', 'startup'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be "user" or "startup"' });
    }

    // Find or create user
    let user = await User.findOne({ auth0Id: userHeaders.auth0Id });
    
    if (!user) {
      // Create new user with role
      user = new User({
        auth0Id: userHeaders.auth0Id,
        name: userHeaders.name,
        email: userHeaders.email,
        avatarUrl: userHeaders.picture,
        username: userHeaders.username,
        role: role
      });
      await user.save();
    } else {
      // Update existing user's role
      user.role = role;
      await user.save();
    }

    res.status(200).json({ 
      message: 'Role set successfully',
      user: {
        id: user._id,
        auth0Id: user.auth0Id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error setting user role:', error);
    res.status(500).json({ message: 'Failed to set user role' });
  }
};

module.exports = setUserRole;