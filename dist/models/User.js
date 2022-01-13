"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    username: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    likedProducts: [],
    cart: [],
    orders: [],
    date: { default: Date.now, type: Date },
});
exports.default = mongoose_1.default.model("User", schema);
