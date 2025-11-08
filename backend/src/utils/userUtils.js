const User = require('../models/User');

async function ensureUser(userId, name, email, userPicture) {
  console.log('ensureUser called with:', { userId, name, email, userPicture });
  let user = await User.findOne({ auth0Id: userId });

  if (!user) {
    console.log('Creating new user');
    const baseUsername = (name || 'user').replace(/\s+/g, '').toLowerCase();
    let username = baseUsername;
    let counter = 1;
    while (await User.findOne({ username })) {
      username = `${baseUsername}${counter++}`;
    }

    // Handle the duplicate key error for null emails temporarily
    // Until we fix the database index
    const userEmail = email || undefined; // Use undefined instead of null to avoid duplicate key error

    user = new User({
      auth0Id: userId,
      name: name || 'Unnamed User',
      email: userEmail,
      avatarUrl: userPicture || 'https://via.placeholder.com/64',
      username,
    });
    
    try {
      await user.save();
      console.log('New user created:', { username: user.username, name: user.name, avatarUrl: user.avatarUrl });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        // Handle duplicate null email error by omitting the email field entirely
        console.log('Duplicate null email detected, creating user without email field');
        user = new User({
          auth0Id: userId,
          name: name || 'Unnamed User',
          // email: omitted to avoid duplicate key error
          avatarUrl: userPicture || 'https://via.placeholder.com/64',
          username,
        });
        await user.save();
        console.log('New user created without email field:', { username: user.username, name: user.name, avatarUrl: user.avatarUrl });
      } else {
        throw error; // Re-throw if it's not the email duplicate key error
      }
    }
  } else {
    console.log('User exists, checking for updates:', { 
      currentName: user.name, 
      newName: name,
      currentAvatar: user.avatarUrl,
      newAvatar: userPicture 
    });
    
    // Update user information if provided and different from current values
    let hasUpdates = false;
    let nameChanged = false;
    
    if (name && user.name !== name) {
      user.name = name;
      nameChanged = true;
      hasUpdates = true;
      console.log('Name updated from', user.name, 'to', name);
    }
    
    if (email && user.email !== email) {
      user.email = email;
      hasUpdates = true;
      console.log('Email updated');
    }
    
    if (userPicture && user.avatarUrl !== userPicture) {
      user.avatarUrl = userPicture;
      hasUpdates = true;
      console.log('Avatar updated from', user.avatarUrl, 'to', userPicture);
    }
    
    // Update username if name has changed
    if (nameChanged) {
      const baseUsername = name.replace(/\s+/g, '').toLowerCase();
      let newUsername = baseUsername;
      let counter = 1;
      
      // Only change username if the new one is different and available
      while (await User.findOne({ username: newUsername, _id: { $ne: user._id } })) {
        newUsername = `${baseUsername}${counter++}`;
      }
      
      if (newUsername !== user.username) {
        user.username = newUsername;
        console.log('Username updated to', newUsername);
      }
    }
    
    if (hasUpdates) {
      await user.save();
      console.log('User updated successfully');
    } else {
      console.log('No updates needed');
    }
  }

  return user;
}

function extractUserFromHeaders(headers) {
  return {
    auth0Id: headers['x-user-id'],
    name: headers['x-user-name'],
    email: headers['x-user-email'],
    picture: headers['x-user-picture'],
    username: (headers['x-user-name'] || 'user').replace(/\s+/g, '').toLowerCase()
  };
}

module.exports = { ensureUser, extractUserFromHeaders };