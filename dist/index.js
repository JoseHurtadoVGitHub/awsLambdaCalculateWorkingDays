"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// src/index.ts
const express_1 = __importDefault(require("express"));
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const morgan_1 = __importDefault(require("morgan"));
const appRouter_1 = require("./config/appRouter");
const zodErrorHandlerMiddleware_1 = require("./middleWares/zodErrorHandlerMiddleware");
const errorHandlerMiddleware_1 = require("./middleWares/errorHandlerMiddleware");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/api", appRouter_1.appRouter);
app.use(zodErrorHandlerMiddleware_1.ZodErrorHandlerMiddleware);
app.use(errorHandlerMiddleware_1.ErrorHandlerMiddleware);
// ✅ Handler para Lambda
exports.handler = (0, serverless_express_1.default)({ app });
// ✅ Para desarrollo local (Railway/Render/localhost)
if (process.env.NODE_ENV !== "lambda") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map