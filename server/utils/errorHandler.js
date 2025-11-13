export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message)
        this.statusCode = statusCode,
            this.isOperational = isOperational,
            Error.captureStackTrace(this, this.constructor)

    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401)
    }
}