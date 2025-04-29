const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: '/default-avatar.png'
    },
    role: {
        type: String,
        default: 'teacher'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    settings: {
        notifications: {
            email: { type: Boolean, default: false },
            quizResults: { type: Boolean, default: false },
            studentActivity: { type: Boolean, default: false }
        },
        quizPreferences: {
            defaultDuration: { type: Number, default: 30 },
            questionsPerPage: { type: String, default: '10' },
            showTimer: { type: Boolean, default: true },
            randomizeQuestions: { type: Boolean, default: false }
        },
        themePreferences: {
            darkMode: { type: Boolean, default: false },
            theme: { type: String, default: 'default' }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
teacherSchema.pre('save', async function(next) {
    const teacher = this;
    if (teacher.isModified('password')) {
        teacher.password = await bcrypt.hash(teacher.password, 8);
    }
    next();
});

// Method to compare password
teacherSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
teacherSchema.methods.getPublicProfile = function() {
    const teacher = this.toObject();
    delete teacher.password;
    delete teacher.tokens;
    return teacher;
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher; 