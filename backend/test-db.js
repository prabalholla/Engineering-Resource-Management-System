const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection successful!');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

testConnection();
