"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
//Global error handling middleware for Express.
//This function is designed to catch and handle any errors that occur during the processing of requests in the Express application.
//It logs the error stack trace to the console for debugging purposes and sends a standardized JSON response with a 500 Internal Server Error status code to the client.
//
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map