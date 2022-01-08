"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
function registerValidation(data) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(3).max(255).label("Name"),
        email: joi_1.default.string().email().required().min(3).max(255).label("Email"),
        password: joi_1.default.string().required().min(6).max(1024).label("Password"),
    });
    return schema.validate(data);
}
exports.registerValidation = registerValidation;
function loginValidation(data) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required().min(3).max(255),
        password: joi_1.default.string().required().min(6).max(1024),
    });
    return schema.validate(data);
}
exports.loginValidation = loginValidation;
