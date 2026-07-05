import { verifyAccessToken } from "../utils/helper.js";
import { ApiError } from "../utils/apiError.js";

export const isAuthenticated = (req, res, next) =>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return next(new ApiError("Authorization header missing", 401));
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return next(new ApiError("Access token missing", 401));
        }

        const decode = verifyAccessToken(token);
        req.user = decode;
        next();

    } catch (error) {
        next(new ApiError("Invalid or expired token", 401));
    }
}


export const authorizeRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ApiError("Access denied", 403));
        }

        next();
    }
}