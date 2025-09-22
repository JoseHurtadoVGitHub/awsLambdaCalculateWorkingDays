"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidator = void 0;
require("reflect-metadata");
function validateZodSchema() {
    return (schema) => (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req, res, next) {
            try {
                const { body, query, params } = schema;
                const reqParams = {};
                if (body && req.body) {
                    reqParams.body = body.parse(req.body);
                }
                if (query && req.query) {
                    reqParams.query = query.parse(req.query);
                }
                if (params && req.params) {
                    reqParams.params = params.parse(req.params);
                }
                return await originalMethod.call(this, {
                    ...req,
                    ...reqParams,
                }, res, next);
            }
            catch (error) {
                return next(error);
            }
        };
        return descriptor;
    };
}
exports.ZodValidator = validateZodSchema();
//# sourceMappingURL=zodValidator.decorator.js.map