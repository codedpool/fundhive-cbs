// backend/src/controllers/setUserRole.js
const User = require('../models/User');
const { extractUserFromHeaders } = require('../utils/userUtils');

const setUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userHeaders = extractUserFromHeaders(req.headers);

    console.log('Setting user role:', { 
      role, 
      auth0Id: userHeaders.auth0Id,
      name: userHeaders.name 
    });

    if (!role || !['user', 'startup'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be "user" or "startup"' });
    }

    if (!userHeaders.auth0Id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find or create user
    let user = await User.findOne({ auth0Id: userHeaders.auth0Id });
    
    if (!user) {
      // Generate unique username
      const baseUsername = userHeaders.username || 'user';
      let username = baseUsername;
      let counter = 1;
      
      while (await User.findOne({ username })) {
        username = `${baseUsername}${counter++}`;
      }

      // Create new user with role
      user = new User({
        auth0Id: userHeaders.auth0Id,
        name: userHeaders.name,
        email: userHeaders.email,
        avatarUrl: userHeaders.picture,
        username: username,
        role: role
      });
      await user.save();
      console.log('New user created with role:', { username, role });
    } else {
      // Update existing user's role
      user.role = role;
      await user.save();
      console.log('User role updated:', { username: user.username, role });
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
    res.status(500).json({ message: 'Failed to set user role', error: error.message });
  }
};

module.exports = setUserRole;