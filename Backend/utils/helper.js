import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role || "user"
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )

}

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

export const verifyAccessToken = (accessToken) =>{
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
}

export const verifyRefreshToken = (refreshToken) =>{
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
}


export const hashToken = (token) =>{
    return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
}