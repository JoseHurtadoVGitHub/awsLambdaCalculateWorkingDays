"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const workingDaysController_1 = require("../controllers/workingDaysController");
exports.appRouter = (0, express_1.Router)();
exports.appRouter.get("/working-days", workingDaysController_1.WorkingDaysController.calcWorkingDays);
//# sourceMappingURL=appRouter.js.map