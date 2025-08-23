const Project = require('../models/Project');

// GET /api/projects
async function getProjects(_req, res) {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('getProjects error', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

// POST /api/projects
async function createProject(req, res) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error('createProject error', err);
    res.status(400).json({ error: 'Failed to create project' });
  }
}

module.exports = { getProjects, createProject };
