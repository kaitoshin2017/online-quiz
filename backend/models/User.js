const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    trim: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  avatar: {
    type: String,
    default: '/default-avatar.png'
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  completedQuizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizResult'
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  
  // Only hash the password if it's modified or new
  if (user.isModified('password')) {
    try {
      // Generate salt
      const salt = await bcrypt.genSalt(10);
      // Hash password with salt
      user.password = await bcrypt.hash(user.password, salt);
      console.log('Password hashed successfully for user:', user.email);
    } catch (error) {
      console.error('Error hashing password:', error);
      return next(error);
    }
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Trim and normalize the candidate password
    const trimmedPassword = candidatePassword.trim();
    console.log('Comparing passwords for user:', this.email);
    
    // Compare the passwords
    const isMatch = await bcrypt.compare(trimmedPassword, this.password);
    console.log('Password comparison result:', {
      email: this.email,
      isMatch: isMatch
    });
    
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

// Generate auth token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { 
      userId: user._id.toString(),
      role: user.role 
    }, 
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
  return token;
};

// Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log('User not found:', email);
      throw new Error('Invalid login credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      throw new Error('Invalid login credentials');
    }

    return user;
  } catch (error) {
    console.error('Error in findByCredentials:', error);
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User; 