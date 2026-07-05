import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { userRegisterService, userLoginService, refreshAccessTokenService } from "../services/auth.services.js";

export const refreshAccessToken = async(req, res, next) =>{
    const {
        newAccessToken,
        newRefreshToken,
        user
    } = await refreshAccessTokenService(req.cookie.refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000 
    });
        
    return res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        user
    });
}

export const register = async(req, res, next) =>{
    const user = await userRegisterService(req.body);

    return res.status(201).json({
        success: true,
        message: `Account created successfully`,
        user
    });
}


export const login = async(req, res, next) =>{
    const {
        accessToken,
        refreshToken,
        user
    } = await userLoginService(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000 
    });
        
    return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
        user
    });
}



export const logout = async (req, res, next) => {
    return res.status(200).cookie("token", "", {maxAge: 0}).json({
        success: true,
        message: "Logged out successfully"
    });
}


export const getProfile = async(req, res, next) =>{
    let user = await User.findById(req.user._id);
    if(!user){
        return next(new ApiError("User not found", 404));
    }

    return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        profile: user.profile
    });
}


export const updateProfile = async(req, res, next) =>{
    const {name, bio, skills} = req.body;
    if(!name || !bio || !skills){
        return next(new ApiError("Missing required fields", 400));
    }

    const skillsArray = skills.split(',');
    let user = await User.findById(req.user._id);

    if(!user){
        return next(new ApiError("User not found", 404));
    }

    user.name = name;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        profile: user.profile
    });
}