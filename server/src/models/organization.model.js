import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: function() { 
            return this.registrationComplete; 
        },
        trim: true
    },
    type: {
        type: String,
        enum: ['hospital', 'ngo', 'research', 'other'],
        required: function() { 
            return this.registrationComplete; 
        }
    },
    registrationComplete: {
        type: Boolean,
        default: false
    },
    website: {
        type: String,
        default: null,
        validate: {
            validator: function(v) {
                return v === null || /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

// Password hashing middleware
organizationSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Password comparison method
organizationSchema.methods.isPasswordMatched = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Access token generation method
organizationSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {_id: this._id, email: this.email, name: this.name}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: process.env.ACCESS_TOKEN_EXPIARY}
    );
};

// Refresh token generation method
organizationSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {_id: this._id}, 
        process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: process.env.REFRESH_TOKEN_EXPIARY}
    );
};

export const Organization = mongoose.model('Organization', organizationSchema);