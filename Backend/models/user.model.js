import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'recruiter'],
        default: 'user'
    },
    profile:{
        bio: { type: String, default: "" },
        skills: { type: [String], default: [] },
        resume: { type: String, default: "" },
        resumeOriginalName: { type: String, default: "" },
        profilePhoto: { type: String, default: "" },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", default: null }
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {timestamps: true});

// schema function to compare passwords
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;