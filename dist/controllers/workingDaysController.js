"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingDaysController = void 0;
const httpStatus_1 = require("../common/enums/httpStatus");
const workingDaysService_1 = require("../services/workingDaysService");
const zodValidator_decorator_1 = require("../config/zodValidator.decorator");
const workingDaysDto_1 = require("../models/workingDaysDto");
class WorkingDaysController {
    static async calcWorkingDays(req, res, next) {
        try {
            const response = await workingDaysService_1.WorkingDaysService.calcWorkingDays(req.query);
            res.status(httpStatus_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.WorkingDaysController = WorkingDaysController;
__decorate([
    (0, zodValidator_decorator_1.ZodValidator)({
        query: workingDaysDto_1.QueryWorkingDaysSchema,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], WorkingDaysController, "calcWorkingDays", null);
//# sourceMappingURL=workingDaysController.js.map