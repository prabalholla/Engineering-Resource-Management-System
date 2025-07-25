const router = require('express').Router();
const Assignment = require('../models/Assignment');
const User = require('../models/User');

// Get all assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('engineerId', 'name email')
            .populate('projectId', 'name description');
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get assignments for a specific engineer
router.get('/engineer/:id', async (req, res) => {
    try {
        const assignments = await Assignment.find({ engineerId: req.params.id })
            .populate('engineerId', 'name email')
            .populate('projectId', 'name description')
            .sort({ startDate: 1 });
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new assignment
router.post('/', async (req, res) => {
    try {
        // Check engineer's capacity
        const engineer = await User.findById(req.body.engineerId);
        const activeAssignments = await Assignment.find({
            engineerId: req.body.engineerId,
            endDate: { $gte: new Date() }
        });

        const currentAllocation = activeAssignments.reduce((sum, assignment) => 
            sum + assignment.allocationPercentage, 0);

        if (currentAllocation + req.body.allocationPercentage > engineer.maxCapacity) {
            return res.status(400).json({ 
                message: 'Engineer capacity would be exceeded with this assignment' 
            });
        }

        const assignment = new Assignment(req.body);
        const savedAssignment = await assignment.save();
        res.status(201).json(savedAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update assignment
router.put('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.json(assignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete assignment
router.delete('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.json({ message: 'Assignment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
