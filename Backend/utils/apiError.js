export class ApiError extends Error {
    statusCode;
    isOperational;
  
    constructor(message, statusCode = 500, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
}

export class JsonWebTokenError extends ApiError{
    constructor(message = "Invalid signature or malformed token"){
        super(message, 400);
    }
}

export class TokenExpiredError extends ApiError{
    constructor(message = "Token expired"){
        super(message, 400);
    }
}
  
export class NotFoundError extends ApiError {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
}
  
export class ConflictError extends ApiError {
    constructor(message = "Conflict occurred") {
      super(message, 409);
    }
}
  
export class BadRequestError extends ApiError {
    constructor(message = "Bad request") {
      super(message, 400);
    }
}
  
export class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized") {
      super(message, 401);
    }
}