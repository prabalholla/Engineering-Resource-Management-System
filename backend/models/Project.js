const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    description: { 
        type: String,
        required: true
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
    requiredSkills: {
        type: [String],
        required: true,
        default: []
    },
    teamSize: { 
        type: Number, 
        required: true,
        min: 1
    },
    status: { 
        type: String, 
        enum: ['planning', 'active', 'completed'],
        default: 'planning'
    },
    managerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
