import { createUser, findById, findUserByEmail } from "../dao/user.dao.js";
import { generateAccessToken, generateRefreshToken, hashPassword, hashToken, verifyRefreshToken } from "../utils/helper.js";
import { ApiError } from "../utils/apiError.js";

export const refreshAccessTokenService = async(refreshToken) =>{
    if(!refreshToken){
        throw new ApiError("Refresh token missing", 400);
    }

    const decode = verifyRefreshToken(refreshToken);
    const user = await findById(decode.userId);

    if(!user){
        throw new ApiError("User not found");
    }

    if(user.refreshToken !== hashToken(refreshToken)){
        throw new ApiError("Refresh token invalid");
    }

    // refresh token rotation 
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = hashToken(newRefreshToken);
    await user.save();

    return {
        newAccessToken,
        newRefreshToken,
        user
    };
}

export const userLoginService = async (data) =>{
    const {email, password} = data;
    if(!email || !password){
        throw new ApiError("Email and password are required", 400);
    }

    const user = await findUserByEmail(email);
    if(!user){
        throw new ApiError("Invalid credentials", 401);
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new ApiError("Invalid credentials", 401);
    }

    // token generation
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // saving token in DB
    user.refreshToken = hashToken(refreshToken);
    await user.save();

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }
}

export const userRegisterService = async (data) =>{
    const {name, email, password, phoneNumber, role} = data;

    if(!name || !email || !phoneNumber || !password){
        throw new ApiError("All fields are required", 400);
    }

    const existingUser = await findUserByEmail(email);
    if(existingUser){
        throw new ApiError("Email already exists", 409);
    }

    const hash= await hashPassword(password);
    const userObject = {name, email, phoneNumber, password: hash};
    if(role){
        userObject.role = role;
    }

    const user = await createUser(userObject);

    return {
        id: user._id,
        name: user.name,
        email: user.email
    }
}