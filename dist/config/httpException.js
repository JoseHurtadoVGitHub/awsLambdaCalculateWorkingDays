"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const utils_1 = require("../utils/utils");
class HttpException extends Error {
    response;
    status;
    constructor(response, status) {
        super();
        this.response = response;
        this.status = status;
        Object.setPrototypeOf(this, HttpException.prototype);
        this.initMessage();
    }
    initMessage() {
        if ((0, utils_1.isString)(this.response)) {
            this.message = this.response;
        }
        else if ((0, utils_1.isObject)(this.response) && (0, utils_1.isString)(this.response.message)) {
            this.message = this.response.message;
        }
        else if (this.constructor) {
            this.message =
                this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ") ??
                    "Error";
        }
    }
    initName() {
        this.name = this.constructor.name;
    }
    getResponse() {
        return this.response;
    }
    getStatus() {
        return this.status;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=httpException.js.map