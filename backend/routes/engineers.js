const router = require('express').Router();
const User = require('../models/User');
const Assignment = require('../models/Assignment');

// Get all engineers
router.get('/', async (req, res) => {
    try {
        const engineers = await User.find({ role: 'engineer' }).select('-password');
        res.json(engineers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new engineer
router.post('/', async (req, res) => {
    try {
        const { name, email, seniority, skills, employmentType } = req.body;

        // Validate required fields
        if (!name || !email || !seniority || !employmentType) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create new engineer
        const engineer = new User({
            name,
            email,
            role: 'engineer',
            seniority,
            skills: skills || [],
            employmentType,
            maxCapacity: employmentType === 'full-time' ? 100 : 50,
            // Set a default password - in production, you'd want to send an email with a reset link
            password: 'changeme123'
        });

        await engineer.save();
        const engineerResponse = { ...engineer.toObject() };
        delete engineerResponse.password;
        res.status(201).json(engineerResponse);
    } catch (err) {
        console.error('Error creating engineer:', err);
        res.status(500).json({ message: err.message });
    }
});

// Update engineer
router.put('/:id', async (req, res) => {
    try {
        const { name, email, seniority, skills, employmentType } = req.body;

        // Validate required fields
        if (!name || !email || !seniority || !employmentType) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if email already exists for other users
        const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const updatedEngineer = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                seniority,
                skills: skills || [],
                employmentType,
                maxCapacity: employmentType === 'full-time' ? 100 : 50
            },
            { new: true }
        ).select('-password');

        if (!updatedEngineer) {
            return res.status(404).json({ message: 'Engineer not found' });
        }

        res.json(updatedEngineer);
    } catch (err) {
        console.error('Error updating engineer:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get engineer capacity
router.get('/:id/capacity', async (req, res) => {
    try {
        const engineer = await User.findById(req.params.id);
        if (!engineer) {
            return res.status(404).json({ message: 'Engineer not found' });
        }

        const activeAssignments = await Assignment.find({
            engineerId: req.params.id,
            endDate: { $gte: new Date() }
        });

        const totalAllocated = activeAssignments.reduce((sum, assignment) => 
            sum + assignment.allocationPercentage, 0);

        res.json({
            maxCapacity: engineer.maxCapacity,
            allocated: totalAllocated,
            available: engineer.maxCapacity - totalAllocated
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
