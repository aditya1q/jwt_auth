class CustomError extends Error {
    constructor(message, statusCode, success = false) {
        super(message); // Call the parent class constructor with the message
        this.success = success; // Add a custom 'success' property
        this.statusCode = statusCode || 500; // Default status code to 500
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}

export default CustomError;
