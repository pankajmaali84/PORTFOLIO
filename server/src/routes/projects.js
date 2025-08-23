const router = require('express').Router();
const { getProjects, createProject } = require('../controllers/projectsController');

router.get('/', getProjects);
router.post('/', createProject);

module.exports = router;
