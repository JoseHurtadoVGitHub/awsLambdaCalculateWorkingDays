"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryWorkingDaysSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.QueryWorkingDaysSchema = zod_1.default
    .object({
    days: zod_1.default.coerce
        .number()
        .positive()
        .optional()
        .describe("Number of business days to add (optional, positive integer)"),
    hours: zod_1.default.coerce
        .number()
        .positive()
        .optional()
        .describe("Number of business hours to add (optional, positive integer)"),
    date: zod_1.default
        .string()
        .datetime({ message: "Date must be in ISO 8601 format with Z suffix" })
        .refine((val) => val.endsWith("Z"), {
        message: "Date must end with 'Z' to indicate UTC timezone",
    })
        .optional()
        .describe("Initial date/time in UTC (ISO 8601) with Z suffix (optional). If provided, it will be the starting point and converted to Colombia local time for business rules; if not provided, calculation starts from current time in Colombia"),
})
    .refine((data) => data.days !== undefined || data.hours !== undefined, {
    message: "Debe enviarse al menos 'days' o 'hours'.",
    path: ["days"],
});
//# sourceMappingURL=workingDaysDto.js.map