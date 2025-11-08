const User = require('../models/User');

async function populateProjectUser(project) {
  try {
    console.log('Attempting to populate user for project:', project._id, 'with userId:', project.userId);
    const user = await User.findOne({ auth0Id: project.userId }).select('username avatarUrl');
    console.log('Populated user for project:', { projectId: project._id, user }); // Debug log
    
    return {
      ...project.toObject(),
      userId: user
        ? { auth0Id: project.userId, username: user.username, avatarUrl: user.avatarUrl } // Include auth0Id
        : { auth0Id: project.userId, username: 'Unknown User', avatarUrl: 'https://via.placeholder.com/64' },
    };
  } catch (error) {
    console.error('Error populating project user:', error);
    // Return project with fallback user data
    return {
      ...project.toObject(),
      userId: { auth0Id: project.userId, username: 'Unknown User', avatarUrl: 'https://via.placeholder.com/64' },
    };
  }
}

module.exports = { populateProjectUser };