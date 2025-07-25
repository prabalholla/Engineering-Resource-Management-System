const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    engineerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    allocationPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    startDate: { 
        type: Date, 
        required: true
    },
    endDate: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(endDate) {
                return !this.startDate || endDate > this.startDate;
            },
            message: 'End date must be after start date'
        }
    },
    role: { 
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
