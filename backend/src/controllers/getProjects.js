const Project = require('../models/Project');
const { populateProjectUser } = require('../utils/projectUtils');

async function getProjects(req, res) {
  try {
    console.log('getProjects called with query:', req.query);
    
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    console.log('MongoDB query:', query);
    const projects = await Project.find(query);
    console.log('Found projects:', projects.length);
    
    const populatedProjects = await Promise.all(projects.map(populateProjectUser));
    console.log('Populated projects sent to frontend:', populatedProjects.length);
    
    res.status(200).json(populatedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

module.exports = getProjects;