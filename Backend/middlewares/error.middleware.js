import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    const response = {
        success: false,
        message
    };

    if (err.errors) {
        response.errors = err.errors;
    }

    if (process.env.NODE_ENV !== 'production' && err.stack) {
        response.stack = err.stack;
    }
    

    res.status(statusCode).json(response);
};
