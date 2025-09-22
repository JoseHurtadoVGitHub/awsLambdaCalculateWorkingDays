"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorHandlerMiddleware = ZodErrorHandlerMiddleware;
const httpStatus_1 = require("../common/enums/httpStatus");
const zod_1 = require("zod");
function ZodErrorHandlerMiddleware(err, _, res, next) {
    if (err instanceof zod_1.ZodError) {
        const message = err.issues.reduce((acc, issue) => {
            let message = "";
            const path = issue.path.join(".");
            message += `${path} - ${issue.message}`;
            acc.push(message);
            return acc;
        }, Array());
        res.status(httpStatus_1.HttpStatus.BAD_REQUEST).json({
            error: "InvalidParameters",
            message: message,
        });
        console.error("Zod validation error:", err);
        return;
    }
    // Si no es ZodError, pasar al siguiente middleware
    next(err);
}
//# sourceMappingURL=zodErrorHandlerMiddleware.js.map