const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ['engineer', 'manager'], 
        required: true 
    },
    // Engineer specific fields
    skills: {
        type: [String],
        default: [],
        validate: {
            validator: function(skills) {
                return this.role !== 'engineer' || skills.length > 0;
            },
            message: 'Engineer must have at least one skill'
        }
    },
    seniority: {
        type: String,
        enum: ['junior', 'mid', 'senior'],
        required: function() {
            return this.role === 'engineer';
        }
    },
    maxCapacity: {
        type: Number,
        default: function() {
            return this.role === 'engineer' ? 100 : 0;
        },
        min: 0,
        max: 100,
        validate: {
            validator: function(value) {
                if (this.role !== 'engineer') return true;
                return value === 100 || value === 50;
            },
            message: 'Engineer capacity must be either 100 (full-time) or 50 (part-time)'
        }
    },
    department: {
        type: String,
        required: function() {
            return this.role === 'engineer';
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
