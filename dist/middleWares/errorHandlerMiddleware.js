"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const httpStatus_1 = require("../common/enums/httpStatus");
const httpException_1 = require("../config/httpException");
const ErrorHandlerMiddleware = (err, _, res, next) => {
    console.error(err);
    let status = httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal Server Error";
    if (err instanceof httpException_1.HttpException) {
        status = err.getStatus();
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(status).json({
        message,
    });
    next(err);
};
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=errorHandlerMiddleware.js.map