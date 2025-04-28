const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    notifications: {
        email: {
            type: Boolean,
            default: false
        },
        quizResults: {
            type: Boolean,
            default: false
        },
        studentActivity: {
            type: Boolean,
            default: false
        }
    },
    quizPreferences: {
        defaultDuration: {
            type: Number,
            default: 30
        },
        questionsPerPage: {
            type: String,
            default: '10'
        },
        showTimer: {
            type: Boolean,
            default: true
        },
        randomizeQuestions: {
            type: Boolean,
            default: false
        }
    },
    theme: {
        darkMode: {
            type: Boolean,
            default: false
        },
        themeColor: {
            type: String,
            default: 'default',
            enum: ['default', 'blue', 'green', 'purple', 'orange']
        }
    }
}, {
    timestamps: true
});

// Create a compound index for faster lookups
settingsSchema.index({ userId: 1, createdAt: -1 });

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings; 