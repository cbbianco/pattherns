"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audit = void 0;
function Audit() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            let response = originalMethod.apply(this, args);

            console.log("Request ===> ", args);
            console.log("Resposne ===> ", result);

            return response;
        };
        return descriptor;
    };
}
exports.Audit = Audit;
