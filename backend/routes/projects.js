const router = require('express').Router();
const Project = require('../models/Project');
const User = require('../models/User');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('managerId', 'name email');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new project
router.post('/', async (req, res) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('managerId', 'name email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Find suitable engineers for a project
router.get('/:id/suitable-engineers', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const engineers = await User.find({
            role: 'engineer',
            skills: { $in: project.requiredSkills }
        }).select('-password');

        res.json(engineers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update project
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('managerId', 'name email');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
